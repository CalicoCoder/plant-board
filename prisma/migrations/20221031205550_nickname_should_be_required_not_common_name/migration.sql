/*
  Warnings:

  - Made the column `nickName` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "commonName" DROP NOT NULL,
ALTER COLUMN "nickName" SET NOT NULL;
