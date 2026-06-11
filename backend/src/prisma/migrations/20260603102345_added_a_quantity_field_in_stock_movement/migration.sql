/*
  Warnings:

  - Added the required column `quantity` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "quantity" INTEGER NOT NULL;
