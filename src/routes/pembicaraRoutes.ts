import express from "express";

import {
  createPembicara,
  getPembicara,
  showPembicara,
  updatePembicara,
  deletePembicara,
} from "../controllers/pembicaraController.js";

const router = express.Router();

// GET semua pembicara
router.get("/", getPembicara);

// GET pembicara berdasarkan id
router.get("/:id", showPembicara);

// POST tambah pembicara
router.post("/", createPembicara);

// PUT update pembicara
router.put("/:id", updatePembicara);

// DELETE pembicara
router.delete("/:id", deletePembicara);

export default router;