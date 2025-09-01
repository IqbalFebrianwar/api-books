-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HRD', 'MANAGER', 'KARYAWAN');

-- CreateEnum
CREATE TYPE "AbsensiStatus" AS ENUM ('HADIR', 'IZIN', 'SAKIT', 'CUTI', 'ALPHA');

-- CreateEnum
CREATE TYPE "GajiStatus" AS ENUM ('PROSES', 'DITERIMA');

-- CreateEnum
CREATE TYPE "PersetujuanStatus" AS ENUM ('PENDING', 'DITERIMA', 'DITOLAK');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karyawan" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "nama_lengkap" TEXT,
    "nip" TEXT,
    "posisi" TEXT,
    "tanggal_masuk" TIMESTAMP(3),
    "alamat" TEXT,
    "no_hp" TEXT,
    "foto_url" TEXT,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" UUID NOT NULL,
    "karyawan_id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jam_masuk" TIMESTAMP(3),
    "jam_keluar" TIMESTAMP(3),
    "status" "AbsensiStatus" NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gaji" (
    "id" UUID NOT NULL,
    "karyawan_id" UUID NOT NULL,
    "bulan" TEXT NOT NULL,
    "gaji_pokok" DECIMAL(12,2) NOT NULL,
    "tunjangan" DECIMAL(12,2) NOT NULL,
    "potongan" DECIMAL(12,2) NOT NULL,
    "total_gaji" DECIMAL(12,2) NOT NULL,
    "status" "GajiStatus" NOT NULL DEFAULT 'PROSES',

    CONSTRAINT "Gaji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuti" (
    "id" UUID NOT NULL,
    "karyawan_id" UUID NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "alasan" TEXT,
    "status" "PersetujuanStatus" NOT NULL DEFAULT 'PENDING',
    "disetujui_oleh" UUID,

    CONSTRAINT "Cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Izin" (
    "id" UUID NOT NULL,
    "karyawan_id" UUID NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "alasan" TEXT,
    "status" "PersetujuanStatus" NOT NULL DEFAULT 'PENDING',
    "disetujui_oleh" UUID,

    CONSTRAINT "Izin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laporan" (
    "id" UUID NOT NULL,
    "karyawan_id" UUID NOT NULL,
    "periode" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "isi" TEXT,

    CONSTRAINT "Laporan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_user_id_key" ON "Karyawan"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_nip_key" ON "Karyawan"("nip");

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gaji" ADD CONSTRAINT "Gaji_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuti" ADD CONSTRAINT "Cuti_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuti" ADD CONSTRAINT "Cuti_disetujui_oleh_fkey" FOREIGN KEY ("disetujui_oleh") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Izin" ADD CONSTRAINT "Izin_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Izin" ADD CONSTRAINT "Izin_disetujui_oleh_fkey" FOREIGN KEY ("disetujui_oleh") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
