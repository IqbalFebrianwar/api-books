import { Request, Response } from 'express';
import prisma from '../models/model';
import { HashPass } from '../utils/bcrypt';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.findMany();

        if(!result){
            return res.status(404).json({
                statusCode: 404,
                massage: "User tidak di temukan"
            })
        }
        return res.status(200).json({
            statusCode: 200,
            message: "User Telah Di Temukan",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const hashPass = await HashPass(password)
        const result = await prisma.user.create({
            data:{
                username,
                password: hashPass,
                role:"KARYAWAN"

            },
            select: {
                id: true,
                username: true,
            },

        })

        if (!result) {
            return res.status(404).json({ message: "Data Not Found" });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "User Dapat Di Tambahkan!",
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};

export const getUserId = async (req : Request, res : Response) => {
    
    try {
        const userId  = req.params.id
        const result = await prisma.user.findUnique({
            where: {
                id : userId
            }
        })

        return res.status(200).json({
            statusCode : 200,
            message : "Data telah telah di temukan!",
            data : result
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const updateUser = async (req : Request, res : Response) => {
    const {userId} = req.params
    const {username, password} = req.body

    try {
        const existingUser = await prisma.user.findUnique({ where: { id:  userId} });

        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const hashedPassword = password ? await HashPass(password) : existingUser.password;

        await prisma.user.update({
            where: { id: userId },
            data: { username: username || existingUser.username, password: hashedPassword },
        });

        return res.status(200).json({ message: "Data User telah berhasil diubah" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteUser = async (req : Request,res : Response) => {
    const {userId} = req.params

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "Data Not Found" });
        }

        await prisma.user.delete({ where: { id: userId } });

        return res.status(200).json({ message: "User berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}