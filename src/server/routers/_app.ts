import { z } from "zod";
import { procedure, router } from "../trpc";

import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
