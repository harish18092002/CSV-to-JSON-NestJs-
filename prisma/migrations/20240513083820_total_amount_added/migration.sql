/*
  Warnings:

  - You are about to drop the column `total_amount` on the `Address` table. All the data in the column will be lost.
  - Added the required column `total_amount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "total_amount";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "total_amount" TEXT NOT NULL;
