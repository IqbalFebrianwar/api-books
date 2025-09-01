import { Request, Response } from 'express';
import prisma from '../models/model';

export const getAllCuti = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cuti.findMany({
      include: {
        karyawan: {
          select: {
            id: true,
            nama_lengkap: true,
            nip: true,
          },
        },
        disetujui: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: {
        tanggal_mulai: 'desc',
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data cuti berhasil diambil',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data cuti',
    });
  }
};

export const getCutiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.cuti.findUnique({
      where: { id },
      include: {
        karyawan: true,
        disetujui: true,
      },
    });

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data cuti tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data cuti berhasil ditemukan',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data cuti',
    });
  }
};

export const createCuti = async (req: Request, res: Response) => {
  const { karyawan_id, tanggal_mulai, tanggal_selesai, alasan } = req.body;

  try {
    const cuti = await prisma.cuti.create({
      data: {
        karyawan_id,
        tanggal_mulai: new Date(tanggal_mulai),
        tanggal_selesai: new Date(tanggal_selesai),
        alasan,
        status: 'PENDING',
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Pengajuan cuti berhasil dibuat',
      data: cuti,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal membuat pengajuan cuti',
    });
  }
};

export const updateCuti = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tanggal_mulai, tanggal_selesai, alasan, status, disetujui_oleh } = req.body;

  try {
    const existing = await prisma.cuti.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: 'Data cuti tidak ditemukan' });
    }

    const updated = await prisma.cuti.update({
      where: { id },
      data: {
        tanggal_mulai: tanggal_mulai ? new Date(tanggal_mulai) : existing.tanggal_mulai,
        tanggal_selesai: tanggal_selesai ? new Date(tanggal_selesai) : existing.tanggal_selesai,
        alasan: alasan ?? existing.alasan,
        status: status ?? existing.status,
        disetujui_oleh: disetujui_oleh ?? existing.disetujui_oleh,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data cuti berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal memperbarui data cuti',
    });
  }
};

export const deleteCuti = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cuti = await prisma.cuti.findUnique({ where: { id } });

    if (!cuti) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data cuti tidak ditemukan',
      });
    }

    await prisma.cuti.delete({ where: { id } });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data cuti berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menghapus data cuti',
    });
  }
};
