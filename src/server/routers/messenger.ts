import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prismadb";
import pusher from "../../lib/pusher";

export const messengerRouter = router({
  push: procedure
    .input(
      z.object({
        msg: z.string(),
        conversationId: z.string(),
        userId: z.string(),
        date: z.string(),
        avatarUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { msg, conversationId, userId, date, avatarUrl } = input;
      console.log(input);
      try {
        const pusherResponse = await pusher.trigger(
          conversationId,
          "new-message",
          {
            msg,
            userId,
            date,
            avatarUrl,
          }
        );

        console.log("pusher response: ", pusherResponse);
        return { ok: true };
      } catch (error) {
        console.log(error);
        return { ok: false };
      }
    }),
  newConversation: procedure
    .input(
      z.object({
        creatorId: z.string(),
        userIds: z.string().array(),
      })
    )
    .mutation(async ({ input }) => {
      const { userIds, creatorId } = input;
      console.log("Inside new Convo endpoint: ", creatorId, userIds);
    }),
});

// export type definition of API
export type AppRouter = typeof messengerRouter;
