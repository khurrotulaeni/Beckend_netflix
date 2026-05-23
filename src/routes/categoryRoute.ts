import Express from "express";

import { 
    getCategories,
    createCategories, 
    showCategories,
    updateCategories,
    deleteCategories
} from "../controllers/categoryController.js";

const router = Express.Router();

router.get("/", getCategories);
router.post("/", createCategories);
router.get("/:id", showCategories);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);

export default router;