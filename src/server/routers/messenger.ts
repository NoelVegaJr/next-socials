import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prismadb";
import pusher from "../../lib/pusher";

export const messengerRouter = router({
  push: procedure
    .input(
      z.object({
        text: z.string(),
        conversationId: z.string(),
        userId: z.string(),
        date: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { text, conversationId, userId, date, image } = input;
      console.log(input);
      try {
        const message = await prisma.message.create({
          data: {
            conversationId,
            userId,
            text,
          },
          include: {
            sender: true,
          },
        });

        const pusherResponse = await pusher.trigger(
          conversationId,
          "new-message",
          {
            id: message.id,
            text,
            userId,
            date,
            image,
            sender: message.sender,
          }
        );

        return { ok: true };
      } catch (error) {
        return { ok: false };
      }
    }),
  getConversationsByUserId: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId,
            },
          },
        },

        include: {
          participants: {
            include: {
              user: true,
            },
          },
          messages: {
            include: {
              sender: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      return conversations;
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
      await prisma.conversation.create({
        data: {
          participants: {
            createMany: {
              data: [
                ...userIds.map((id) => {
                  return { userId: id, creator: creatorId === id };
                }),
              ],
            },
          },
        },
      });
    }),
  newMessage: procedure
    .input(
      z.object({
        conversationId: z.string(),
        userId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { conversationId, userId, text } = input;

      await prisma.message.create({
        data: {
          conversationId,
          userId,
          text,
        },
      });
    }),
  searchMessages: procedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {}),
});

// export type definition of API
export type AppRouter = typeof messengerRouter;
