/*
  Warnings:

  - A unique constraint covering the columns `[nickName]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plant_nickName_key" ON "Plant"("nickName");
