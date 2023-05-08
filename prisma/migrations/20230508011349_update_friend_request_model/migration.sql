/*
  Warnings:

  - A unique constraint covering the columns `[senderClerkId,receiverClerkId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FriendRequest_receiverClerkId_key";

-- DropIndex
DROP INDEX "FriendRequest_senderClerkId_key";

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderClerkId_receiverClerkId_key" ON "FriendRequest"("senderClerkId", "receiverClerkId");
