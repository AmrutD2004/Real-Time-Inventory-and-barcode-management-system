-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Warehouses" ADD COLUMN     "warehouseStatus" "Status" NOT NULL DEFAULT 'Active';
