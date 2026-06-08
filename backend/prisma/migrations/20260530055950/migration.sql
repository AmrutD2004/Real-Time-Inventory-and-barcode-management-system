/*
  Warnings:

  - A unique constraint covering the columns `[warehouse_id,product_id]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_warehouse_id_product_id_key" ON "Stock"("warehouse_id", "product_id");
