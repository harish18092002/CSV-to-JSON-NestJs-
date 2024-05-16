/*
  Warnings:

  - The primary key for the `Amount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Amount` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Amount` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Amount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountCount` to the `Amount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Amount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Amount" DROP CONSTRAINT "Amount_id_fkey";

-- AlterTable
ALTER TABLE "Amount" DROP CONSTRAINT "Amount_pkey",
DROP COLUMN "id",
DROP COLUMN "total_amount",
ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "amountCount" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL,
ADD CONSTRAINT "Amount_pkey" PRIMARY KEY ("transactionId");
