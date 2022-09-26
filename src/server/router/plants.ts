import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from '@prisma/client'
import { prismaClient } from "../db/client";

const mainPlantSummary = Prisma.validator<Prisma.PlantSelect>()({
  id: true,  
  nickName: true,
  commonName: true,
  waterInstructions: true,
  purchaseDate: true,
  waterDates: {
    select: {
      date: true
    },
    take: 1,
    orderBy: {
      date: 'asc',
    },
  },
});

export type MainPlantSummaryPayload = Prisma.PlantGetPayload<{
  select: typeof mainPlantSummary
}>;

export const plantRouter = createRouter()
  .query("plantByNickname", {
    input: z
      .object({
        nickname: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      return {
        plant: await prismaClient.plant.findUnique({
          where: {
            nickName: input!.nickname
          }
        }),
      };
    },
  })
  .query("getPlantsSummary", {
    async resolve({ ctx }) {
     return await ctx.prismaClient.plant.findMany({
       select: mainPlantSummary
     });
    },
  });
