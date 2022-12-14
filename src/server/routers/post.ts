import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prismadb";

export const postRouter = router({
  getPostsByUserId: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const userPosts = await prisma.post.findMany({
        where: { userId },
        include: {
          user: true,
          likes: true,
          comments: { include: { user: true } },
        },
      });
      return userPosts;
    }),
  getPostsByUsername: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;
      const userPosts = await prisma.post.findMany({
        where: { user: { username } },
        include: {
          user: true,
          likes: true,
          comments: { include: { user: true } },
        },
      });
      return userPosts;
    }),
  getHomePosts: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;

      const following = await prisma.follower.findMany({
        where: { followerUserId: userId },
        select: {
          followingUserId: true,
        },
      });

      const posts = await prisma.post.findMany({
        where: {
          userId: {
            in: [...following.map((f) => f.followingUserId), userId],
          },
        },
        include: {
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              date: "desc",
            },
          },
          likes: true,
          user: {
            select: {
              username: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
      });

      return posts;
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
  newComment: procedure
    .input(
      z.object({ postId: z.string(), userId: z.string(), text: z.string() })
    )
    .mutation(async ({ input }) => {
      const { postId, userId, text } = input;
      await prisma.postComment.create({
        data: { postId, userId, text, date: new Date() },
      });
    }),
  getCommentCountByPostId: procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const { postId } = input;
      const comments = await prisma.postComment.findMany({
        where: { postId },
      });

      return comments.length;
    }),
});

// export type definition of API
export type AppRouter = typeof postRouter;
