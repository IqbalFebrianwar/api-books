import express from "express";
import userRoutes from './routes/user.route';
import loanRoutes from './routes/loan.route';
import bookRoutes from './routes/book.route';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', loanRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Hello world!" });
});

app.listen(PORT, ()=> {
    console.log(`server is running in PORT ${PORT}`)
})