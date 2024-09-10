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
exports.createLoans = void 0;
const database_config_1 = __importDefault(require("../config/database-config"));
const createLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, book_id, description } = req.body;
    try {
        const result = yield database_config_1.default.query('INSERT INTO loans (user_id, book_id, description) VALUES ($1, $2, $3) RETURNING *', [user_id, book_id, description]);
        return res.status(200).json({
            statusCode: 200,
            message: "Peminjaman telah di ajukan!",
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
exports.createLoans = createLoans;
