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
        },
      });

      return newPost;
    }),
});

// export type definition of API
export type AppRouter = typeof postRouter;
