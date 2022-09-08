-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "commonName" TEXT NOT NULL DEFAULT 'plant common name (ex: snake plant)',
    "nickName" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "waterDates" TIMESTAMP(3)[],
    "waterInstructions" TEXT,
    "notes" TEXT,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
