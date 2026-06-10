import { Request, Response } from "express";
import { prisma } from "../lib/db";
import bcrypt from "bcrypt";

// 1. Menampilkan semua user
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
      error,
    });
  }
};

// 2. Menambahkan user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, foto } = req.body;

    if (!name || !email || !password || !foto) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        foto,
      },
    });

    res.status(201).json({
      message: "User berhasil ditambahkan",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan user",
      error,
    });
  }
};

// 3. Menampilkan user berdasarkan id
export const showUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail user",
      error,
    });
  }
};

// 4. Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, foto } = req.body;

    const dataUpdate: any = {
      name,
      email,
      foto,
    };

    if (password) {
      dataUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: dataUpdate,
    });

    res.json({
      message: "User berhasil diupdate",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate user",
      error,
    });
  }
};

// 5. Menghapus user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "User berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus user",
      error,
    });
  }
};