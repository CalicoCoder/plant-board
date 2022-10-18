import {createRouter} from "./context";
import {z} from "zod";
import {Prisma} from '@prisma/client'
import {prismaClient} from "../db/client";

const mainPlantSummary = Prisma.validator<Prisma.PlantSelect>()({
  id: true,
  nickName: true,
  commonName: true,
  waterInstructions: true,
  purchaseDate: true,
  notes: true,
  waterDates: {
    select: {
      date: true
    },
    take: 1,
    orderBy: {
      date: 'desc',
    },
  },
});

export type MainPlantSummaryPayload = Prisma.PlantGetPayload<{
  select: typeof mainPlantSummary
}>;

function getPurchaseDate(purchaseDate: string | undefined) {
  return purchaseDate ? new Date(purchaseDate) : null;
}

export const plantRouter = createRouter()
  .query("plantByNickname", {
    input: z
      .object({
        nickname: z.string(),
      })
      .nullish(),
    async resolve({input}) {
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
    async resolve({ctx}) {
      return await ctx.prismaClient.plant.findMany({
        select: mainPlantSummary,
        orderBy: [
          {
            nickName: 'asc'
          }
        ]
      });
    },
  })
  .mutation("createPlant", {
    input: z
      .object({
        nickName: z.string().min(1),
        commonName: z.string().optional(),
        purchaseDate: z.string().optional(),
        waterInstructions: z.string().optional(),
        notes: z.string().optional()
      }),
    async resolve({input}) {
      const purchaseDate = getPurchaseDate(input.purchaseDate);
      return {
        result: await prismaClient.plant.create({
          data: {
            nickName: input.nickName,
            commonName: input.commonName,
            purchaseDate: purchaseDate,
            waterInstructions: input.waterInstructions,
            notes: input.notes
          }
        }),
      }
    }
  })
  .mutation("updatePlant", {
    input: z
      .object({
        id: z.number(),
        nickName: z.string().min(1),
        commonName: z.string().optional(),
        purchaseDate: z.string().optional(),
        waterInstructions: z.string().optional(),
        notes: z.string().optional()
      }),
    async resolve({input}) {
      const purchaseDate = getPurchaseDate(input.purchaseDate);
      return {
        result: await prismaClient.plant.update({
          where: {
            id: input.id
          },
          data: {
            nickName: input.nickName,
            commonName: input.commonName,
            purchaseDate,
            waterInstructions: input.waterInstructions,
            notes: input.notes
          }
        }),
      }
    }
  })
  .mutation("addWaterDate", {
    input: z
      .object({
        waterDate: z.date(),
        plantId: z.number()
      }),
    async resolve({input}) {
      return {
        result: await prismaClient.waterDate.create({
          data: {
            date: input.waterDate,
            plantId: input.plantId
          }
        }),
      }
    }
  });
