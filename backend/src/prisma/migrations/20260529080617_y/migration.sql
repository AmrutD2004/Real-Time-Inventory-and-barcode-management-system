/*
  Warnings:

  - You are about to drop the column `barcode` on the `Products` table. All the data in the column will be lost.
  - Added the required column `barcodeImage` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcodeNo` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "barcode",
ADD COLUMN     "barcodeImage" TEXT NOT NULL,
ADD COLUMN     "barcodeNo" TEXT NOT NULL;
