import { Router } from "@oak/oak/router";
import { Argon2Wrapper, RSAWrapper } from "cas-typescript-sdk";
import { eq } from "drizzle-orm/expressions";
import jwt from "jsonwebtoken";
import { db, USERS } from "../../db/schema.ts";
import { GetTokenDto } from "../../models/auth/get-token-dto.ts";
import { GetTokenResponseDto } from "../../models/auth/get-token-response-dto.ts";
import { UserDoesntExistDto } from "../../models/auth/user-doesnt-exist-dto.ts";

const router = new Router();

router.post("/token", async (ctx) => {
    try {
        const body: GetTokenDto = await ctx.request.body.json();
        // TODO: email regex
        const user = await db.select().from(USERS).where(
            eq(USERS.email, body.email),
        );
        if (user.length === 0) {
            ctx.response.status = 400;
            ctx.response.body = new UserDoesntExistDto("User doesn't exist");
            return;
        }
        const isPasswordValid = new Argon2Wrapper().verify(
            user[0].password!,
            body.password,
        );
        if (!isPasswordValid) {
            ctx.response.status = 401;
            return;
        }
        const rsa = new RSAWrapper();
        const rsaKeys = rsa.generateKeys(2048);
        // TODO: store public key in redis cache
        const token = jwt.sign({ userId: user[0].id }, rsaKeys.privateKey, {
            algorithm: "RS256",
        });
        ctx.response.status = 200;
        ctx.response.body = new GetTokenResponseDto(token);
    } catch (error) {
        ctx.response.status = 500;
        return;
    }
});

export default router;
