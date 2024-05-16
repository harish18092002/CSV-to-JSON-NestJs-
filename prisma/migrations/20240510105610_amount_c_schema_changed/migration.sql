/*
  Warnings:

  - The primary key for the `Amount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Amount` table. All the data in the column will be lost.
  - You are about to drop the column `amountCount` on the `Amount` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Amount` table. All the data in the column will be lost.
  - Added the required column `cash` to the `Amount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Amount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `Amount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Amount" DROP CONSTRAINT "Amount_pkey",
DROP COLUMN "amount",
DROP COLUMN "amountCount",
DROP COLUMN "transactionId",
ADD COLUMN     "cash" JSONB NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "total_amount" TEXT NOT NULL,
ADD CONSTRAINT "Amount_pkey" PRIMARY KEY ("id");
