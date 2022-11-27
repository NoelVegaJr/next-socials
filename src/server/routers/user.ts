import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../lib/prismadb";

export const userRouter = router({
  usernameExists: procedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { username } = input;

      const user = await prisma.user.findUnique({ where: { username } });

      if (user) {
        return true;
      } else {
        return false;
      }
    }),
  updateUsername: procedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { username, userId } = input;

      await prisma.user.update({
        where: { id: userId },
        data: { username, joinDate: new Date() },
      });
    }),
  searchUsersByUsername: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;

      const users = await prisma.user.findMany({
        where: { username: { contains: username } },
      });

      return users;
    }),
  getUsersByUsername: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;

      const users = await prisma.user.findMany({
        where: { username },
        include: {
          followers: true,
          following: true,
          posts: {
            include: {
              comments: true,
              likes: true,
              user: true,
            },
          },
        },
      });

      return users;
    }),
  getUserByUsername: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;

      const users = await prisma.user.findUnique({
        where: { username },
        include: {
          followers: true,
          following: true,
          posts: {
            include: {
              comments: true,
              likes: true,
              user: true,
            },
            orderBy: {
              date: "desc",
            },
          },
        },
      });

      return users;
    }),
  getUserByUserId: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;

      const users = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          followers: true,
          following: true,
          posts: {
            include: {
              comments: true,
              likes: true,
              user: true,
            },
          },
        },
      });

      return users;
    }),
  follow: procedure
    .input(
      z.object({ followingUserId: z.string(), followerUserId: z.string() })
    )
    .mutation(async ({ input }) => {
      const { followerUserId, followingUserId } = input;

      await prisma.follower.create({
        data: { followingUserId, followerUserId },
      });
    }),
  unfollow: procedure
    .input(
      z.object({ followerUserId: z.string(), followingUserId: z.string() })
    )
    .mutation(async ({ input }) => {
      const { followerUserId, followingUserId } = input;

      await prisma.follower.deleteMany({
        where: { followerUserId, followingUserId },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof userRouter;
