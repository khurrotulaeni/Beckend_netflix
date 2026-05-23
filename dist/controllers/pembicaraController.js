import { prisma } from "../lib/db.js";
// 1. Menampilkan semua pembicara
export const getPembicara = async (req, res) => {
    try {
        const pembicara = await prisma.pembicara.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(pembicara);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data pembicara",
            error,
        });
    }
};
// 2. Menyimpan pembicara
export const createPembicara = async (req, res) => {
    try {
        const { name, role, image } = req.body;
        if (!name || !role || !image) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
            });
        }
        const newPembicara = await prisma.pembicara.create({
            data: {
                name,
                role,
                image,
            },
        });
        res.status(201).json({
            message: "Pembicara berhasil ditambahkan",
            pembicara: newPembicara,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menambahkan pembicara",
            error,
        });
    }
};
// 3. Menampilkan pembicara berdasarkan id
export const showPembicara = async (req, res) => {
    try {
        const { id } = req.params;
        const pembicara = await prisma.pembicara.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!pembicara) {
            return res.status(404).json({
                message: "Pembicara tidak ditemukan",
            });
        }
        res.json(pembicara);
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail pembicara",
            error,
        });
    }
};
// 4. Mengupdate pembicara
export const updatePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, image } = req.body;
        const updatedPembicara = await prisma.pembicara.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                role,
                image,
            },
        });
        res.json({
            message: "Pembicara berhasil diupdate",
            pembicara: updatedPembicara,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal mengupdate pembicara",
            error,
        });
    }
};
// 5. Menghapus pembicara
export const deletePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pembicara.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({
            message: "Pembicara berhasil dihapus",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Gagal menghapus pembicara",
            error,
        });
    }
};
//# sourceMappingURL=pembicaraController.js.map