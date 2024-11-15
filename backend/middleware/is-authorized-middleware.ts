import { Context } from "@oak/oak/context";
import jwt from "jsonwebtoken";
import redisConnection from "../garnet-connection.ts";

export const authourized = async (ctx: Context, next: any) => {
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
    console.log(decodedToken);
    const rsaPublicKey = await redisConnection.get(
      `user-token-public-key-${decodedToken.userId}`
    );
    if (!rsaPublicKey) {
      throw new Error("No public key was found");
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
