import {publicProcedure, router} from "./context";
import {z} from "zod";
import {Prisma} from '@prisma/client'

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
  commonName?: string | undefined
  purchaseDate?: string | undefined
  waterInstructions?: string | undefined
  notes?: string | undefined
}

export type PlantCreateInput = {
  nickName: string
  commonName?: string | undefined
  purchaseDate?: string | undefined
  waterInstructions?: string | undefined
  notes?: string | undefined
}

function getPurchaseDate(purchaseDate: string | null | undefined) {
  return purchaseDate ? new Date(purchaseDate) : null;
}

export const plantRouter = router({
  addWaterDate: publicProcedure
    .input(
      z.object({
        waterDate: z.date(),
        plantId: z.number()
      }),
    )
    .mutation(async ({input, ctx}) => {
      return {
        result: await ctx.prismaClient.waterDate.create({
          data: {
            date: input.waterDate,
            plantId: input.plantId
          }
        }),
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        nickName: z.string().min(1),
        commonName: z.string().nullable().optional(),
        purchaseDate: z.string().nullable().optional(),
        waterInstructions: z.string().nullable().optional(),
        notes: z.string().nullable().optional()
      }),
    )
    .mutation(async ({input, ctx}) => {
      const purchaseDate = getPurchaseDate(input.purchaseDate);
      return {
        result: await ctx.prismaClient.plant.create({
          data: {
            nickName: input.nickName,
            commonName: input.commonName,
            purchaseDate: purchaseDate,
            waterInstructions: input.waterInstructions,
            notes: input.notes
          }
        }),
      }
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number()
      }),
    )
    .mutation(async ({input, ctx}) => {
      await ctx.prismaClient.waterDate.deleteMany({
        where: {
          plantId: input.id
        }
      });
      return {
        result: await ctx.prismaClient.plant.delete({
          where: {
            id: input.id
          }
        }),
      }
    }),
  getPlantsSummary: publicProcedure.query(async ({ctx}) => {
    return await ctx.prismaClient.plant.findMany({
      select: mainPlantSummary,
      orderBy: [
        {
          nickName: 'asc'
        }
      ]
    });
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        nickName: z.string().min(1),
        commonName: z.string().nullable().optional(),
        purchaseDate: z.string().nullable().optional(),
        waterInstructions: z.string().nullable().optional(),
        notes: z.string().nullable().optional()
      }),
    )
    .mutation(async ({input, ctx}) => {
      const purchaseDate = getPurchaseDate(input.purchaseDate);
      return {
        result: await ctx.prismaClient.plant.update({
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
    }),
});
