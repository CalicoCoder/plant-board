import {Prisma} from "@prisma/client";

export const MainPlantSummary = Prisma.validator<Prisma.PlantSelect>()({
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
  select: typeof MainPlantSummary
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
