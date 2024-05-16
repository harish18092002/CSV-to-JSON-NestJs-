/*
  Warnings:

  - A unique constraint covering the columns `[created_by]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_created_by_key" ON "Transaction"("created_by");
