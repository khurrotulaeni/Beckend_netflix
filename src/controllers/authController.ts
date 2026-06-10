import { Request,  Response } from "express";
import { prisma } from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";            

export const login = async(req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        //Validasi input user
        if(!email || !password ){
            return res.status(400)
            .json({message: 'Email dan password harus diisi'});
        }

        //cek existing user
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        //jika user tidak ditemukan, kembalikan respon error
        if (!existingUser) {
            return res.status(401)
            .json({message: "Email tidak ditemukan"});
        }

        //verifikasi password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400)
            .json({message: "password salah",
            });
        }
        const token = jwt.sign(
            {
                userId: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h"
            }
        );

        //jika password benar, kembalikan respon sukses
        return res.status(200).json({ // Tambah 'return' agar lebih konsisten
            message: "Login berhasil",
            user: {
                name: existingUser.name,
                email: existingUser.email
            },
                token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi Kesalahan server",
        });
    }
} // <-- Kurung penutup fungsi login dipindah ke sini dengan benar

export const register = async(req: Request, res: Response) => {
    //menangkap data yang dikirimkan oleh client
    try {
        const {name, email, password, foto} = req.body;

        //validasi input user
        if(!name || !email || !password ||!foto) {
            return res.status(400)
            .json({message: 'nama, email, dan password harus diisi'});
        }

        //cek existing user
        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        //jika user sudah ada, kembalikan response
        if(existingUser){
            return res.status(400)
                .json({
                    message: 'Email sudah terdaftar',
                });
        }

        //Jika user belum ada, buat user baru dan simpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                foto
            }
        })

        return res.status(201).json({
            message: "Register berhasil",
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                foto: newUser.foto
            },
        });
    } catch (error) {
        console.error("Detail Eror:", error);
        return res.status(500).json({
            message: "Terjadi Kesalahan server",
        });
    }
}; 