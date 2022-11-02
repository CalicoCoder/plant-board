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

// TODO: Need to figure out how to get the prisma types and zod to play nicely for this case. Prisma types for
//  update do not match up with the zod expectations for ID to not be optional.
export type PlantUpdateByIdInput = {
  id: number
  nickName: string
  commonName?: string | null
  purchaseDate?: Date | string | null
  waterInstructions?: string | null
  notes?: string | null
}

function getPurchaseDate(purchaseDate: string | null | undefined) {
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
        commonName: z.string().nullable().optional(),
        purchaseDate: z.string().nullable().optional(),
        waterInstructions: z.string().nullable().optional(),
        notes: z.string().nullable().optional()
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
        commonName: z.string().nullable().optional(),
        purchaseDate: z.string().nullable().optional(),
        waterInstructions: z.string().nullable().optional(),
        notes: z.string().nullable().optional()
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
  .mutation("deletePlant", {
    input: z
      .object({
        id: z.number(),
      }),
    async resolve({input}) {
      await prismaClient.waterDate.deleteMany({
        where: {
          plantId: input.id
        }
      });
      return {
        result: await prismaClient.plant.delete({
          where: {
            id: input.id
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
