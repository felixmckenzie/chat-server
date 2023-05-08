/*
  Warnings:

  - You are about to drop the column `contactClerkId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `userClerkId` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerClerkId,connectionClerkId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connectionClerkId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerClerkId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactClerkId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userClerkId_fkey";

-- DropIndex
DROP INDEX "Contact_contactClerkId_key";

-- DropIndex
DROP INDEX "Contact_userClerkId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "contactClerkId",
DROP COLUMN "userClerkId",
ADD COLUMN     "connectionClerkId" TEXT NOT NULL,
ADD COLUMN     "ownerClerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_ownerClerkId_connectionClerkId_key" ON "Contact"("ownerClerkId", "connectionClerkId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_ownerClerkId_fkey" FOREIGN KEY ("ownerClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_connectionClerkId_fkey" FOREIGN KEY ("connectionClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
