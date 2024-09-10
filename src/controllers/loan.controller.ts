import { Request, Response } from 'express';
import pool from '../config/database-config';

export const createLoans = async (req : Request, res : Response) => {
    const {user_id, book_id, description} = req.body

    try {
        const result = await pool.query(
            'INSERT INTO loans (user_id, book_id, description) VALUES ($1, $2, $3) RETURNING *',
            [user_id, book_id, description]
        )
    
        return res.status(200).json({
            statusCode : 200,
            message : "Peminjaman telah di ajukan!",
            data: result.rows
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}