import { z } from "zod";
import { procedure, router } from "../trpc";
import { messengerRouter } from "./messenger";

import { postRouter } from "./post";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  messenger: messengerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
