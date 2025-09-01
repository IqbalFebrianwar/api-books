import { Request, Response } from 'express';
import prisma from '../models/model';

export const getAllGaji = async (req: Request, res: Response) => {
  try {
    const data = await prisma.gaji.findMany({
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
        bulan: 'desc',
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data gaji berhasil diambil',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data gaji',
    });
  }
};

export const getGajiById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.gaji.findUnique({
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
        message: 'Data gaji tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data gaji berhasil ditemukan',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan saat mengambil data',
    });
  }
};

export const createGaji = async (req: Request, res: Response) => {
  const { karyawan_id, bulan, gaji_pokok, tunjangan, potongan } = req.body;

  try {
    const gaji = await prisma.gaji.create({
      data: {
        karyawan_id,
        bulan,
        gaji_pokok,
        tunjangan,
        potongan,
        status: 'PROSES',
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Data gaji berhasil ditambahkan',
      data: gaji,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menambahkan data gaji',
    });
  }
};

export const updateGaji = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bulan, gaji_pokok, tunjangan, potongan, status } = req.body;

  try {
    const existing = await prisma.gaji.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data gaji tidak ditemukan',
      });
    }

    const updatedTotal =
      parseFloat(gaji_pokok || existing.gaji_pokok.toString()) +
      parseFloat(tunjangan || existing.tunjangan.toString()) -
      parseFloat(potongan || existing.potongan.toString());

    const updated = await prisma.gaji.update({
      where: { id },
      data: {
        bulan: bulan || existing.bulan,
        gaji_pokok: gaji_pokok || existing.gaji_pokok,
        tunjangan: tunjangan || existing.tunjangan,
        potongan: potongan || existing.potongan,
        status: status || existing.status,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data gaji berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal memperbarui data gaji',
    });
  }
};

export const deleteGaji = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const gaji = await prisma.gaji.findUnique({ where: { id } });

    if (!gaji) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Data gaji tidak ditemukan',
      });
    }

    await prisma.gaji.delete({ where: { id } });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data gaji berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menghapus data gaji',
    });
  }
};
