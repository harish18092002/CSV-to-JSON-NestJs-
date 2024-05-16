/*
  Warnings:

  - You are about to drop the column `cash_count` on the `Amount` table. All the data in the column will be lost.
  - Changed the type of `cash` on the `Amount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Amount" DROP COLUMN "cash_count",
DROP COLUMN "cash",
ADD COLUMN     "cash" JSONB NOT NULL;
