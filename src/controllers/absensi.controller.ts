import { Request, Response } from 'express';
import prisma from '../models/model';

export const getAllAbsensi = async (req: Request, res: Response) => {
  try {
    const data = await prisma.absensi.findMany({
      include: {
        karyawan: {
          select: {
            id: true,
            nama_lengkap: true,
            nip: true,
          },
        },
      },
      orderBy: {
        tanggal: 'desc',
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data absensi berhasil diambil',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data absensi',
    });
  }
};

export const getAbsensiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.absensi.findUnique({
      where: { id },
      include: {
        karyawan: {
          select: {
            id: true,
            nama_lengkap: true,
            nip: true,
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data absensi tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data absensi berhasil ditemukan',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data',
    });
  }
};

export const createAbsensi = async (req: Request, res: Response) => {
  const { karyawan_id, tanggal, jam_masuk, jam_keluar, status } = req.body;

  try {
    const absensi = await prisma.absensi.create({
      data: {
        karyawan_id,
        tanggal: new Date(tanggal),
        jam_masuk: jam_masuk ? new Date(jam_masuk) : null,
        jam_keluar: jam_keluar ? new Date(jam_keluar) : null,
        status,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Data absensi berhasil ditambahkan',
      data: absensi,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menambahkan data absensi',
    });
  }
};

export const updateAbsensi = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tanggal, jam_masuk, jam_keluar, status } = req.body;

  try {
    const absensi = await prisma.absensi.findUnique({ where: { id } });

    if (!absensi) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data absensi tidak ditemukan',
      });
    }

    const updated = await prisma.absensi.update({
      where: { id },
      data: {
        tanggal: tanggal ? new Date(tanggal) : absensi.tanggal,
        jam_masuk: jam_masuk ? new Date(jam_masuk) : absensi.jam_masuk,
        jam_keluar: jam_keluar ? new Date(jam_keluar) : absensi.jam_keluar,
        status: status || absensi.status,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data absensi berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal memperbarui data absensi',
    });
  }
};

export const deleteAbsensi = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const absensi = await prisma.absensi.findUnique({ where: { id } });

    if (!absensi) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data absensi tidak ditemukan',
      });
    }

    await prisma.absensi.delete({ where: { id } });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data absensi berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menghapus data absensi',
    });
  }
};
