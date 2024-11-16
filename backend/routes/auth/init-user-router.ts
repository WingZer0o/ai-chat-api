import { Router } from "@oak/oak/router";
import { eq } from "drizzle-orm/expressions";
import { intervalServerError } from "../../common/errors/internal-server-error.ts";
import { db, USERS } from "../../db/schema.ts";

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

router.post("/register-first-user", async (ctx) => {});

export default router;
