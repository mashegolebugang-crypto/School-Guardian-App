import { Request, Response } from "express"
import * as attendanceService from "../services/attendance.service.js" // Ensure the correct file extension is used
import { AuthRequest } from "../middleware/auth.middleware"

export async function markAttendance(req: AuthRequest, res: Response) {
  try {
    const { studentId, classId, date, status } = req.body
    const markedById = req.userId!  // from auth middleware

    const attendance = await attendanceService.markAttendance({
      studentId,
      classId,
      date: new Date(date).toISOString(),
      status,
      markedById
    })
    res.status(201).json(attendance)
  } catch (error: any) {
    // Handle unique constraint violation (duplicate attendance for same student/date)
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Attendance already marked for this student on this date" })
    }
    res.status(400).json({ error: error.message })
  }
}

export async function getAttendanceForClass(req: Request, res: Response) {
  try {
    const classId = parseInt(Array.isArray(req.params.classId) ? req.params.classId[0] : req.params.classId)
    const { date } = req.query
    if (!date) return res.status(400).json({ error: "Date query param required" })

    const attendance = await attendanceService.getAttendanceForClass(classId, new Date(date as string))
    res.json(attendance)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getAttendanceForStudent(req: Request, res: Response) {
  try {
    const studentId = parseInt(Array.isArray(req.params.studentId) ? req.params.studentId[0] : req.params.studentId)
    const attendance = await attendanceService.getAttendanceForStudent(studentId)
    res.json(attendance)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}