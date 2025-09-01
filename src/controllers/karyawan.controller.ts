import { Request, Response } from 'express';
import prisma from '../models/model';

export const getAllKaryawan = async (req: Request, res: Response) => {
  try {
    const karyawans = await prisma.karyawan.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            is_verified: true,
          },
        },
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Data karyawan berhasil diambil',
      data: karyawans,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

export const getKaryawanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const karyawan = await prisma.karyawan.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            is_verified: true,
          },
        },
      },
    });

    if (!karyawan) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Karyawan tidak ditemukan',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Data karyawan berhasil ditemukan',
      data: karyawan,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

export const createKaryawan = async (req: Request, res: Response) => {
  const {
    user_id,
    nama_lengkap,
    nip,
    posisi,
    tanggal_masuk,
    alamat,
    no_hp,
    foto_url,
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id: user_id } });
    if (!existingUser) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const newKaryawan = await prisma.karyawan.create({
      data: {
        user_id,
        nama_lengkap,
        nip,
        posisi,
        tanggal_masuk: tanggal_masuk ? new Date(tanggal_masuk) : undefined,
        alamat,
        no_hp,
        foto_url,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Karyawan berhasil ditambahkan',
      data: newKaryawan,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal menambahkan karyawan',
    });
  }
};

export const updateKaryawan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nama_lengkap,
    nip,
    posisi,
    tanggal_masuk,
    alamat,
    no_hp,
    foto_url,
  } = req.body;

  try {
    const existing = await prisma.karyawan.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    const updatedKaryawan = await prisma.karyawan.update({
      where: { id },
      data: {
        nama_lengkap,
        nip,
        posisi,
        tanggal_masuk: tanggal_masuk ? new Date(tanggal_masuk) : undefined,
        alamat,
        no_hp,
        foto_url,
      },
    });

    return res.status(200).json({
      message: 'Data karyawan berhasil diubah',
      data: updatedKaryawan,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Gagal mengubah data karyawan',
    });
  }
};

export const deleteKaryawan = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existing = await prisma.karyawan.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    await prisma.karyawan.delete({ where: { id } });

    return res.status(200).json({
      message: 'Karyawan berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal menghapus karyawan',
    });
  }
};
