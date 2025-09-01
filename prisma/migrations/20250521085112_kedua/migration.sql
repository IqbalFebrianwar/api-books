/*
  Warnings:

  - You are about to drop the column `total_gaji` on the `Gaji` table. All the data in the column will be lost.
  - You are about to drop the `Laporan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Laporan" DROP CONSTRAINT "Laporan_karyawan_id_fkey";

-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "ot" INTEGER;

-- AlterTable
ALTER TABLE "Gaji" DROP COLUMN "total_gaji";

-- DropTable
DROP TABLE "Laporan";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "fee_overtime" BIGINT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
