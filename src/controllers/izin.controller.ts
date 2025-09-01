import { Request, Response } from 'express';
import prisma from '../models/model';

export const getAllIzin = async (req: Request, res: Response) => {
  try {
    const data = await prisma.izin.findMany({
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
        tanggal: 'desc',
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data izin berhasil diambil',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal mengambil data izin',
    });
  }
};

export const getIzinById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await prisma.izin.findUnique({
      where: { id },
      include: {
        karyawan: true,
        disetujui: true,
      },
    });

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data izin tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data izin berhasil ditemukan',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data izin',
    });
  }
};

export const createIzin = async (req: Request, res: Response) => {
  const { karyawan_id, tanggal, alasan } = req.body;

  try {
    const izin = await prisma.izin.create({
      data: {
        karyawan_id,
        tanggal: new Date(tanggal),
        alasan,
        status: 'PENDING',
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Permintaan izin berhasil dibuat',
      data: izin,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal membuat permintaan izin',
    });
  }
};

export const updateIzin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tanggal, alasan, status, disetujui_oleh } = req.body;

  try {
    const existing = await prisma.izin.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: 'Data izin tidak ditemukan' });
    }

    const updated = await prisma.izin.update({
      where: { id },
      data: {
        tanggal: tanggal ? new Date(tanggal) : existing.tanggal,
        alasan: alasan ?? existing.alasan,
        status: status ?? existing.status,
        disetujui_oleh: disetujui_oleh ?? existing.disetujui_oleh,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data izin berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal memperbarui data izin',
    });
  }
};

export const deleteIzin = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const izin = await prisma.izin.findUnique({ where: { id } });

    if (!izin) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data izin tidak ditemukan',
      });
    }

    await prisma.izin.delete({ where: { id } });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data izin berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menghapus data izin',
    });
  }
};
