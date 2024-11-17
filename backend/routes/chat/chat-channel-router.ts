import { Router } from "@oak/oak/router";
import { desc, eq } from "drizzle-orm";
import { intervalServerError } from "../../common/errors/internal-server-error.ts";
import { ChatChannelDBO } from "../../db/auth/chat-channel-dbo.ts";
import { CHAT_CHANNELS, db } from "../../db/schema.ts";

const router = new Router();

router.put("/change-chat-channel-name", async (ctx) => {
  const body = await ctx.request.body.json();
  const modifiedDate = new Date().getTime();
  await db
    .update(CHAT_CHANNELS)
    .set({ channelName: body.chatChannelName, modifiedAt: modifiedDate })
    .where(eq(CHAT_CHANNELS.id, body.id));
  ctx.response.status = 200;
  ctx.response.body = {
    modifiedAt: modifiedDate,
  };
});

router.delete("/delete-chat-channel", async (ctx) => {
  const chatChannel = ctx.request.url.searchParams.get("chatChannelId");
  await db.delete(CHAT_CHANNELS).where(eq(CHAT_CHANNELS.id, chatChannel));
  ctx.response.status = 200;
});

router.get("/get-chat-channels-for-user", async (ctx) => {
  try {
    const userId = ctx.state.userId;
    const chatChannels = await db
      .select()
      .from(CHAT_CHANNELS)
      .where(eq(CHAT_CHANNELS.userId, userId))
      .orderBy(desc(CHAT_CHANNELS.modifiedAt));
    ctx.response.body = chatChannels;
    ctx.response.status = 200;
  } catch (error) {
    intervalServerError(ctx, error);
  }
});

router.post("/add-chat-channel", async (ctx) => {
  try {
    const body = await ctx.request.body.json();
    const newId = await db
      .insert(CHAT_CHANNELS)
      .values({ channelName: body.chatChannel, userId: ctx.state.userId })
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
