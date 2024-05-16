/*
  Warnings:

  - Added the required column `cash_count` to the `Amount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Amount" ADD COLUMN     "cash_count" TEXT NOT NULL,
ALTER COLUMN "cash" SET DATA TYPE TEXT;
