/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transaction_Id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionId",
ADD COLUMN     "transaction_Id" TEXT NOT NULL;
