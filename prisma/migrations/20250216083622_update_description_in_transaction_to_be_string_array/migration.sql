/*
  Warnings:

  - The `description` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description";
ALTER TABLE "Transaction" ADD COLUMN     "description" STRING[];
