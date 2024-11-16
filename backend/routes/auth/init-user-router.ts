import { Router } from "@oak/oak/router";
import { Argon2Wrapper, RSAWrapper } from "cas-typescript-sdk";
import { eq } from "drizzle-orm/expressions";
import jwt from "jsonwebtoken";
import { intervalServerError } from "../../common/errors/internal-server-error.ts";
import { UserDBO } from "../../db/auth/user-dbo.ts";
import { db, USERS } from "../../db/schema.ts";
import redisConnection from "../../garnet-connection.ts";
import { isAuthorizedMiddleware } from "../../middleware/is-authorized-middleware.ts";
import { GetTokenResponseDto } from "../../models/auth/get-token-response-dto.ts";

const router = new Router();

router.get("/does-initial-user-exist", async (ctx) => {
  try {
    const doesUserExist = await db.select().from(USERS).where(eq(USERS.id, 1));
    if (doesUserExist?.length === 0) {
      ctx.response.status = 404;
      return;
    }
    ctx.response.status = 200;
  } catch (error) {
    intervalServerError(ctx, error);
  }
});

router.post("/register-first-user", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const doesUserExist = await db.select().from(USERS).where(eq(USERS.id, 1));
    if (doesUserExist?.length > 0) {
      ctx.response.status = 409;
      return;
    }
    const argon2 = new Argon2Wrapper();
    await db
      .insert(USERS)
      .values(
        new UserDBO(body.email, argon2.hashPassword(body.password), null)
      );
    ctx.response.status = 200;
  } catch (error) {
    intervalServerError(ctx, error);
  }
});

router.post("/login", async (ctx) => {
  const body = await ctx.request.body.json();
  const user = await db.select().from(USERS).where(eq(USERS.id, 1));
  const isValidPassword = new Argon2Wrapper().verify(
    user[0].password!,
    body.password
  );
  if (!isValidPassword) {
    ctx.response.status = 401;
    return;
  }
  const rsa = new RSAWrapper();
  const rsaKeys = rsa.generateKeys(2048);
  await db
    .update(USERS)
    .set({ tokenRsaPublicKey: rsaKeys.publicKey })
    .where(eq(USERS.id, 1));
  await redisConnection.set(
    `user-token-public-key-${user[0].id}`,
    rsaKeys.publicKey
  );
  const token = jwt.sign({ userId: user[0].id }, rsaKeys.privateKey, {
    algorithm: "RS256",
  });
  ctx.response.body = new GetTokenResponseDto(token);
  ctx.response.status = 200;
});

router.use("/is-token-valid", isAuthorizedMiddleware);
router.get("/is-token-valid", async (ctx) => {
  // middleware validates the token
  ctx.response.status = 200;
});

export default router;
