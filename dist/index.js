"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const loan_route_1 = __importDefault(require("./routes/loan.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/', user_route_1.default);
app.use('/', book_route_1.default);
app.use('/', loan_route_1.default);
app.get('/', (req, res) => {
    res.json({ message: "Hello world!" });
});
app.listen(PORT, () => {
    console.log(`server is running in PORT ${PORT}`);
});
