// src/server/router/index.ts
import {router} from "./context";
import {plantRouter} from "./plants";

export const appRouter = router({
  plant: plantRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
