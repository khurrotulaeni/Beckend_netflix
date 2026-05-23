import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua movie
export const getMovies = async (req: Request, res: Response) => {
    try {
        const movies = await prisma.movie.findMany();

        res.status(200).json(movies);

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data movie",
            error
        });
    }
};

// 2. Menyimpan movie
export const createMovies = async (req: Request, res: Response) => {
    try {
        const { name, role, foto } = req.body;

        // validasi
        if (!name || !role || !foto) {
            return res.status(400).json({
                message: "Semua Field Harus Diisi"
            });
        }

        // simpan ke database
        const movie = await prisma.movie.create({
            data: {
                name,
                role,
                foto
            }
        });

        res.status(201).json({
            message: "Movie Berhasil Disimpan",
            movie
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan movie",
            error
        });
    }
};

// 3. Menampilkan movie berdasarkan id
export const showMovies = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const movie = await prisma.movie.findUnique({
            where: { id }
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie Tidak Ditemukan"
            });
        }

        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan",
            error
        });
    }
};

// 4. Update movie
export const updateMovies = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const { name, role, foto } = req.body;

        const movie = await prisma.movie.update({
            where: { id },
            data: {
                name,
                role,
                foto
            }
        });

        res.status(200).json({
            message: "Movie Berhasil Diupdate",
            movie
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update movie",
            error
        });
    }
};

// 5. Delete movie
export const deleteMovies = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await prisma.movie.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Movie Berhasil Dihapus"
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus movie",
            error
        });
    }
};