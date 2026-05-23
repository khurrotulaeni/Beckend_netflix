import express from "express";

import {
  getEvent,
  createEvent,
  showEvent,
  updateEvents,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// GET semua event
router.get("/", getEvent);

// GET event berdasarkan id
router.get("/:id", showEvent);

// POST tambah event
router.post("/", createEvent);

// PUT update event
router.put("/:id", updateEvents);

// DELETE event
router.delete("/:id", deleteEvent);

export default router;