import { Router } from "@oak/oak/router";
import { intervalServerError } from "../../common/errors/internal-server-error.ts";
import { ChatChannelDBO } from "../../db/auth/chat-channel-dbo.ts";
import { CHAT_CHANNELS, db } from "../../db/schema.ts";

const router = new Router();

router.post("/add-chat-channel", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const newId = await db
      .insert(CHAT_CHANNELS)
      .values({ channelName: body.chatChannel })
      .returning();
    ctx.response.status = 200;
    ctx.response.body = new ChatChannelDBO(
      newId[0].id,
      body.chatChannel,
      newId[0].createdAt,
      newId[0].modifiedAt
    );
  } catch (error) {
    intervalServerError(ctx, error);
  }
});

export default router;
