import { Request, Response } from 'express';
import pool from '../config/database-config';

export const getBook = async (req : Request, res : Response) => {
    try {
        const result = await pool.query(
            'SELECT * FROM books'
        )
        return res.status(200).json({
            statusCode : 200,
            message : "Data Books telah ditemukan",
            data : result.rows
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const getBookId = async (req : Request, res : Response) => {
    const {id} = req.params

    try {
        const result = await pool.query(
            'SELECT id, title, author FROM books WHERE id = $1',
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
            message : "Data Books telah ditemukan",
            data : result.rows
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const createBooks = async (req: Request, res : Response) => {
    const {title, author} = req.body

    try {
        const result = await pool.query(
            'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
            [title, author]
        )

        return res.status(200).json({
            statusCode: 200,
            message: "Book Dapat Di Tambahkan!",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

export const updateBooks = async (req : Request, res : Response) => {
    const {id} = req.params
    const {title, author} = req.body

    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *',
            [title, author, id]
        )
    
        if(result.rows.length === 0){
            return res.status(400).json({
                statusCode : 400,
                message : "Data not Found"
            })
        }

        return res.status(200).json({
            statusCode : 200,
            message : "Book telah di Update"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : "Internal Server Error"
        })
    }
}

export const deleteBooks = async (req : Request, res : Response) => {
    const {id} = req.params

    try {
        const result = await pool.query(
            'DELETE FROM books WHERE id = $1 RETURNING *',
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