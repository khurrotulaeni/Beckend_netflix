import express from "express";

import {
  createUser,
  getUsers,
  showUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// GET semua user
router.get("/", getUsers);

// GET user berdasarkan id
router.get("/:id", showUser);

// POST tambah user
router.post("/", createUser);

// PUT update user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

export default router;