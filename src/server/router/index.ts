// src/server/router/index.ts
import {createRouter} from "./context";
import superjson from "superjson";

import {plantRouter} from "./plants";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("plant.", plantRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
