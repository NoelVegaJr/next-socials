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
  updateUserProfile: procedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        bio: z.string(),
        website: z.string(),
        avatar: z.string(),
        banner: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, name, bio, website, avatar, banner } = input;
      console.log("avatar: ", avatar);

      await prisma.user.update({
        where: { id: userId },
        data: { name, bio, website, image: avatar, banner },
      });
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

      console.log(users);

      return users;
    }),
  getUsersByUsername: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;
      if (!username) {
        console.log("no username");
        return;
      }

      const users = await prisma.user.findMany({
        where: { username: { contains: username } },
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
  listNewConnections: procedure
    .input(z.object({ userId: z.string(), count: z.number() }))
    .query(async ({ input }) => {
      const { userId, count } = input;
      const following = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          following: {
            select: {
              followingUserId: true,
            },
          },
        },
      });

      // following.following.map((f) => f.followingUserId);
      const newConnections = await prisma.user.findMany({
        where: {
          id: {
            notIn: following
              ? [...following.following.map((f) => f.followingUserId), userId]
              : [userId],
          },
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
        take: count,
      });

      return newConnections;
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
