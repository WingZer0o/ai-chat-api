import { Context } from "@oak/oak/context";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db, USERS } from "../db/schema.ts";
import redisConnection from "../garnet-connection.ts";

export const isAuthorizedMiddleware = async (ctx: Context, next: any) => {
  try {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");
    if (!authorization) {
      ctx.response.status = 401;
      return;
    }
    const token = authorization.split(" ")[1];

    if (!token) {
      ctx.response.status = 401;
      return;
    }
    // TODO: pull
    const decodedToken = await jwt.decode(token);
    let rsaPublicKey = await redisConnection.get(
      `user-token-public-key-${decodedToken.userId}`
    );

    if (!rsaPublicKey) {
      const databaseKey = await db
        .select({ tokenRsaPublicKey: USERS.tokenRsaPublicKey })
        .from(USERS)
        .where(eq(USERS.id, 1));
      if (databaseKey?.length > 0) {
        await redisConnection.set(
          `user-token-public-key-${decodedToken.userId}`,
          databaseKey[0].tokenRsaPublicKey!
        );
        rsaPublicKey = databaseKey[0].tokenRsaPublicKey;
      }
    }
    const payload = await jwt.verify(token, rsaPublicKey);
    if (!payload) {
      throw new Error("Token was not valid");
    }
    await next();
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = {
      message: "You are not authorized to access this route",
    };
    return;
  }
};
