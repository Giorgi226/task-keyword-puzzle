-- CreateTable
CREATE TABLE "Puzzle" (
    "puzzleId" TEXT NOT NULL,
    "imageUrl" TEXT[],
    "keyword" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "remainingTimeSeconds" INTEGER NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("puzzleId")
);
