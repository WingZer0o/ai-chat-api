import { Router } from "@oak/oak/router";
import { UserDBO } from "../../db/auth/user-dbo.ts";
import { db, USERS } from "../../db/schema.ts";
import { CreateUserDto } from "../../models/auth/create-user-dto.ts";

const router = new Router();

router.post("/create-user", async (ctx) => {
    const body: CreateUserDto = await ctx.request.body.json();
    const userDBO = new UserDBO();
    userDBO.email = body.email;
    userDBO.password = body.password;
    await db.insert(USERS).values(userDBO);
    ctx.response.body = userDBO;
});

export default router;
