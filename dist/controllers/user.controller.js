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
exports.deleteUser = exports.updateUser = exports.getUserId = exports.createUser = exports.getUsers = void 0;
const database_config_1 = __importDefault(require("../config/database-config"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_config_1.default.query('SELECT * FROM users');
        return res.status(200).json({
            statusCode: 200,
            message: "User Telah Di Temukan",
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
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield database_config_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return res.status(200).json({
            statusCode: 200,
            message: "User Dapat Di Tambahkan!",
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
exports.createUser = createUser;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield database_config_1.default.query('SELECT id, username FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Data not Found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Data telah telah di temukan!",
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
exports.getUserId = getUserId;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const result = yield database_config_1.default.query('UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, password, id]);
        if (result.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Data not Found"
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "User telah di Update"
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield database_config_1.default.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
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
exports.deleteUser = deleteUser;
