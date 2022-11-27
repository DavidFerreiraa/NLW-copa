/*
  Warnings:

  - You are about to drop the column `firstTeamPointsFinalResult` on the `Guess` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamPointsFinalResult` on the `Guess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN "firstTeamPointsFinalResult" INTEGER;
ALTER TABLE "Game" ADD COLUMN "secondTeamPointsFinalResult" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    CONSTRAINT "Guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("createdAt", "firstTeamPoints", "gameId", "id", "participantId", "secondTeamPoints") SELECT "createdAt", "firstTeamPoints", "gameId", "id", "participantId", "secondTeamPoints" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
CREATE UNIQUE INDEX "Guess_participantId_gameId_key" ON "Guess"("participantId", "gameId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
