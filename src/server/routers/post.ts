import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prismadb";

export const postRouter = router({
  getPostsByUserId: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      console.log("trpc post router userId: ", userId);
      const userPosts = await prisma.post.findMany({
        where: { userId },
        include: { likes: true },
      });
      console.log("trpc post router: ", userPosts);
      return userPosts;
    }),
  create: procedure
    .input(
      z.object({
        userId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, text } = input;

      const newPost = await prisma.post.create({
        data: {
          text,
          userId,
          date: new Date(),
        },
      });

      return newPost;
    }),
  like: procedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { postId, userId } = input;
      await prisma.postLike.create({
        data: { postId, userId },
      });
    }),
  unlike: procedure
    .input(z.object({ likeId: z.string() }))
    .mutation(async ({ input }) => {
      const { likeId } = input;
      await prisma.postLike.delete({
        where: { id: likeId },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof postRouter;
