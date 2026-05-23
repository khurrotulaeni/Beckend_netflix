import Express from "express";

import {
    getMovies,
    createMovies,
    showMovies,
    updateMovies,
    deleteMovies
} from "../controllers/movieController.js";

const router = Express.Router();

router.get("/", getMovies);
router.post("/", createMovies);
router.get("/:id", showMovies);
router.put("/:id", updateMovies);
router.delete("/:id", deleteMovies);

export default router;