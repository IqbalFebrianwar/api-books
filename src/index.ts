import express from "express";
import userRoutes from './routes/user.route';
import karyawanRoutes from './routes/karyawan.route';
import absensiRoutes from './routes/absensi.route';
import cutiRoutes from './routes/cuti.route';
import izinRoutes from './routes/izin.route';
import gajiRoutes from './routes/gaji.route';
import AuthServices from './utils/auth'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', AuthServices);
app.use('/', userRoutes);
app.use('/', karyawanRoutes);
app.use('/', absensiRoutes);
app.use('/', cutiRoutes);
app.use('/', izinRoutes);
app.use('/', gajiRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Hello world!" });
});

app.listen(PORT, ()=> {
    console.log(`server is running in PORT ${PORT}`)
})

module.exports = app;