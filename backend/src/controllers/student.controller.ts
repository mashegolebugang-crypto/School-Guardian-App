import { Request, Response } from "express"
// Make sure the file exists at ../services/student.service.ts
import * as studentService from "../services/student.service";

export async function createStudent(req: Request, res: Response) {
  try {
    const student = await studentService.createStudent(req.body)
    res.status(201).json(student)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function getAllStudents(req: Request, res: Response) {
  try {
    const students = await studentService.getStudents()
    res.json(students)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getStudentById(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    const student = await studentService.getStudentById(id)
    if (!student) return res.status(404).json({ error: "Student not found" })
    res.json(student)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    await studentService.updateStudent(id, req.body)
    const student = await studentService.getStudentById(id)
    if (!student) return res.status(404).json({ error: "Student not found" })
    res.json(student)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function deleteStudent(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    await studentService.deleteStudent(id)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}