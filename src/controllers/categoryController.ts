import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan semua category
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data category",
            error
        });
    }
};

// 2. Menyimpan category
export const createCategories = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // validasi
        if (!name) {
            return res.status(400).json({
                message: "Nama Harus Diisi"
            });
        }

        // simpan ke database
        const category = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json({
            message: "Category Berhasil Disimpan",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menyimpan category",
            error
        });
    }
};

// 3. Menampilkan category berdasarkan id
export const showCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            return res.status(404).json({
                message: "Category Tidak Ditemukan"
            });
        }

        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({
            message: "Terjadi Kesalahan",
            error
        });
    }
};

// 4. Update category
export const updateCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        const category = await prisma.category.update({
            where: { id },
            data: { name }
        });

        res.status(200).json({
            message: "Category Berhasil Diupdate",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal update category",
            error
        });
    }
};

// 5. Delete category
export const deleteCategories = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await prisma.category.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Category Berhasil Dihapus"
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus category",
            error
        });
    }
};