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

      await prisma.user.update({ where: { id: userId }, data: { username } });
    }),
});

// export type definition of API
export type AppRouter = typeof userRouter;
