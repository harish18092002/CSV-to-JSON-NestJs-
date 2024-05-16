/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `credit` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `debit` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transactionType" AS ENUM ('CREDIT', 'DEBIT');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "credit",
DROP COLUMN "debit",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "transaction_type" "transactionType" NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_Id");
