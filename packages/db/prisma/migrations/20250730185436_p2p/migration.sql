/*
  Warnings:

  - You are about to drop the column `locked` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "locked",
ALTER COLUMN "amount" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "P2P" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "P2P_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2P" ADD CONSTRAINT "P2P_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2P" ADD CONSTRAINT "P2P_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
