import { createRouter } from "./context";
import { z } from "zod";

export const plantRouter = createRouter()
  .query("plantByNickname", {
    input: z
      .object({
        nickname: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      return {
        plant: await prisma.plant.findUnique({
          where: {
            nickName: input?.nickname ?? ""
          }
        }),
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return {plants: await ctx.prisma.plant.findMany()}
    },
  });
