/*
  Warnings:

  - Made the column `address_1` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address_2` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address_1" SET NOT NULL,
ALTER COLUMN "address_2" SET NOT NULL;
