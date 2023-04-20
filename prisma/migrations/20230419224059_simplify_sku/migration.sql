/*
  Warnings:

  - You are about to drop the column `sKUId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `SKU` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sKUId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sKUId",
ADD COLUMN     "sku" TEXT NOT NULL;

-- DropTable
DROP TABLE "SKU";
