"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooks = exports.updateBooks = exports.createBooks = exports.getBookId = exports.getBook = void 0;
const database_config_1 = __importDefault(require("../config/database-config"));
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_config_1.default.query('SELECT * FROM books');
        return res.status(200).json({
            statusCode: 200,
            message: "Data Books telah ditemukan",
            data: result.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});
exports.getBook = getBook;
const getBookId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield database_config_1.default.query('SELECT id, title, author FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Data not Found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Data Books telah ditemukan",
            data: result.rows
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});
exports.getBookId = getBookId;
const createBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = req.body;
    try {
        const result = yield database_config_1.default.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
        return res.status(200).json({
            statusCode: 200,
            message: "Book Dapat Di Tambahkan!",
            data: result.rows[0]
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});
exports.createBooks = createBooks;
const updateBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        const result = yield database_config_1.default.query('UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *', [title, author, id]);
        if (result.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Data not Found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Book telah di Update"
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});
exports.updateBooks = updateBooks;
const deleteBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield database_config_1.default.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Data not Found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Data Berhasil di Hapus"
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error", error
        });
    }
});
exports.deleteBooks = deleteBooks;
