/*
  Warnings:

  - You are about to drop the column `contactUserId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userClerkId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactClerkId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactClerkId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userClerkId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactUserId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropIndex
DROP INDEX "Contact_contactUserId_key";

-- DropIndex
DROP INDEX "Contact_userId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "contactUserId",
DROP COLUMN "userId",
ADD COLUMN     "contactClerkId" TEXT NOT NULL,
ADD COLUMN     "userClerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userClerkId_key" ON "Contact"("userClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_contactClerkId_key" ON "Contact"("contactClerkId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contactClerkId_fkey" FOREIGN KEY ("contactClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
