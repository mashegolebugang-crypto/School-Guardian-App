import { Router } from "express";
import * as classController from "../controllers/class.controller";

const router = Router();

router.post("/", classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

export default router;