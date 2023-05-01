/*
  Warnings:

  - You are about to drop the column `receiverId` on the `FriendRequest` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `FriendRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderClerkId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverClerkId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverClerkId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderClerkId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_senderId_fkey";

-- DropIndex
DROP INDEX "FriendRequest_receiverId_key";

-- DropIndex
DROP INDEX "FriendRequest_senderId_key";

-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverClerkId" TEXT NOT NULL,
ADD COLUMN     "senderClerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderClerkId_key" ON "FriendRequest"("senderClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_receiverClerkId_key" ON "FriendRequest"("receiverClerkId");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderClerkId_fkey" FOREIGN KEY ("senderClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverClerkId_fkey" FOREIGN KEY ("receiverClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
