import express from "express";
import { getAttendance, addAttendance } from "../controllers/attendance.controller";

const router = express.Router();

router.get("/", getAttendance);
router.post("/", addAttendance);

export default router;