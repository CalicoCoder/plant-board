import {publicProcedure, router} from "./context";
import {z} from "zod";
import {MainPlantSummary, MainPlantSummaryPayload} from "../db/types";

function plantWaterDateComparatorFunction(plantA: MainPlantSummaryPayload, plantB: MainPlantSummaryPayload) {
  if (!plantB.waterDates[0]) return 1;
  if (!plantA.waterDates[0]) return -1;

  if (plantA.waterDates[0].date > plantB.waterDates[0].date) {
    return -1;
  } else if (plantA.waterDates[0].date < plantB.waterDates[0].date) {
    return 1;
  } else return 0;
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
        waterFrequency: z.number().nullable().optional(),
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
            waterFrequency: input.waterFrequency,
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
    let data =  await ctx.prismaClient.plant.findMany({
      select: MainPlantSummary,
      orderBy: [
        {
          nickName: 'asc'
        }
      ]
    });

    data = data.sort(plantWaterDateComparatorFunction)

    return data;
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        nickName: z.string().min(1),
        commonName: z.string().nullable().optional(),
        purchaseDate: z.string().nullable().optional(),
        waterInstructions: z.string().nullable().optional(),
        waterFrequency: z.number().nullable().optional(),
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
            waterFrequency: input.waterFrequency,
            notes: input.notes
          }
        }),
      }
    }),
});
