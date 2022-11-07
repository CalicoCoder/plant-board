/*
  Warnings:

  - You are about to drop the column `waterDates` on the `Plant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "waterDates";

-- CreateTable
CREATE TABLE "WaterDate" (
    "id" SERIAL NOT NULL,
    "date" DATE[],
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "WaterDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WaterDate" ADD CONSTRAINT "WaterDate_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
