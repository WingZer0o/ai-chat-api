import { Router } from "@oak/oak/router";
import { eq } from "drizzle-orm/expressions";
import { UserDBO } from "../../db/auth/user-dbo.ts";
import { db, USERS } from "../../db/schema.ts";
import { CreateUserDto } from "../../models/auth/create-user-dto.ts";
import { UserCreatedDto } from "../../models/auth/user-created-dto.ts";
import { UserExistsDto } from "../../models/auth/user-exists-dto.ts";

const router = new Router();

router.post("/create-user", async (ctx) => {
    const body: CreateUserDto = await ctx.request.body.json();
    const userDBO = new UserDBO();
    userDBO.email = body.email;
    userDBO.password = body.password;
    const doesUserExist = await db.select().from(USERS).where(
        eq(USERS.email, userDBO.email),
    );
    if (doesUserExist.length > 0) {
        ctx.response.status = 400;
        ctx.response.body = new UserExistsDto("User already exists");
        return;
    }
    await db.insert(USERS).values(userDBO);
    ctx.response.status = 200;
    ctx.response.body = new UserCreatedDto("User created");
});

export default router;
