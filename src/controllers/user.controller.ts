import { Request, Response } from 'express';
import pool from '../config/database-config';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM users');

        return res.status(200).json({
            statusCode: 200,
            message: "User Telah Di Temukan",
            data: result.rows
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
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );

        return res.status(200).json({
            statusCode: 200,
            message: "User Dapat Di Tambahkan!",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
};

export const getUserId = async (req : Request, res : Response) => {
    const { id } = req.params

    try {
        const result = await pool.query(
            'SELECT id, username FROM users WHERE id = $1',
            [id]
        )
        
        if(result.rows.length === 0){
            return res.status(400).json({
                statusCode : 400,
                message : "Data not Found"
            })
        }

        return res.status(200).json({
            statusCode : 200,
            message : "Data telah telah di temukan!",
            data : result.rows
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const updateUser = async (req : Request, res : Response) => {
    const {id} = req.params
    const {username, password} = req.body

    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *',
            [username, password, id]
        )
    
        if(result.rows.length === 0){
            return res.status(400).json({
                statusCode : 400,
                message : "Data not Found"
            })
        }

        return res.status(200).json({
            statusCode : 200,
            message : "User telah di Update"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const deleteUser = async (req : Request,res : Response) => {
    const {id} = req.params

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        )
    
        if(result.rows.length === 0){
            return res.status(400).json({
                statusCode : 400,
                message : "Data not Found"
            })
        }
    
        return res.status(200).json({
            statusCode : 200,
            message : "Data Berhasil di Hapus"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error", error
        })
    }
}