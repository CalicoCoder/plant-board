// src/server/router/context.ts
import * as trpcNext from "@trpc/server/adapters/next";
import { prismaClient } from "../db/client";
import superjson from "superjson";
import {initTRPC} from "@trpc/server";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
// type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
// export const createContextInner = async (opts: CreateContextOptions) => {
//   return {
//     prismaClient,
//   };
// };

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  return {
    prismaClient,
  };
};

const t = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
