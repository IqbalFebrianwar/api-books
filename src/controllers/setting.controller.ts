import { Request, Response } from "express";
import prisma from "../models/model";

const toPlain = (row: any) => ({
  ...row,
  fee_overtime: row?.fee_overtime != null ? row.fee_overtime.toString() : null,
});

const toBigInt = (v: unknown): bigint => {
  if (typeof v === "bigint") return v;
  if (typeof v === "number") return BigInt(Math.trunc(v));
  if (typeof v === "string" && v.trim() !== "") return BigInt(v);
  throw new Error("fee_overtime harus berupa angka atau string numerik");
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    const data = await prisma.settings.findMany({
      orderBy: { id: "asc" },
    });
    return res.json(data.map(toPlain));
  } catch (error) {
    console.error("getSettings error:", error);
    return res.status(500).json({ message: "Gagal mengambil data settings" });
  }
};

export const getSettingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.settings.findUnique({ where: { id } });
    if (!data) return res.status(404).json({ message: "Settings tidak ditemukan" });
    return res.json(toPlain(data));
  } catch (error) {
    console.error("getSettingById error:", error);
    return res.status(500).json({ message: "Gagal mengambil detail settings" });
  }
};

export const createSettings = async (req: Request, res: Response) => {
  try {
    const { fee_overtime } = req.body;
    if (fee_overtime === undefined || fee_overtime === null) {
      return res.status(400).json({ message: "fee_overtime wajib diisi" });
    }

    const data = await prisma.settings.create({
      data: {
        fee_overtime: toBigInt(fee_overtime),
      },
    });

    return res.status(201).json(toPlain(data));
  } catch (error: any) {
    console.error("createSettings error:", error);
    return res.status(500).json({ message: error?.message || "Gagal membuat settings" });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fee_overtime } = req.body;

    const exists = await prisma.settings.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Settings tidak ditemukan" });

    const data = await prisma.settings.update({
      where: { id },
      data: {
        ...(fee_overtime !== undefined && { fee_overtime: toBigInt(fee_overtime) }),
      },
    });

    return res.json(toPlain(data));
  } catch (error: any) {
    console.error("updateSettings error:", error);
    return res.status(500).json({ message: error?.message || "Gagal memperbarui settings" });
  }
};

export const deleteSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exists = await prisma.settings.findUnique({ where: { id } });
    if (!exists) return res.status(404).json({ message: "Settings tidak ditemukan" });

    await prisma.settings.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error("deleteSettings error:", error);
    return res.status(500).json({ message: "Gagal menghapus settings" });
  }
};
