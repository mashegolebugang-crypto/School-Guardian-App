import express from "express"
import * as studentController from "../controllers/student.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = express.Router()

// All student routes are protected
router.use(authenticate)

router.post("/", studentController.createStudent)
router.get("/", studentController.getAllStudents)
router.get("/:id", studentController.getStudentById)
router.put("/:id", studentController.updateStudent)
router.delete("/:id", studentController.deleteStudent)

export default router