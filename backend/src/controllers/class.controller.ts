import { Request, Response } from "express"
import * as classService from "../services/class.service"

export async function createClass(req: Request, res: Response) {
  try {
    const cls = await classService.createClass(req.body)
    res.status(201).json(cls)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function getAllClasses(req: Request, res: Response) {
  try {
    const classes = await classService.getAllClasses()
    res.json(classes)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function getClassById(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    const cls = await classService.getClassById(id)
    if (!cls) return res.status(404).json({ error: "Class not found" })
    res.json(cls)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function updateClass(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    const cls = await classService.updateClass(id, req.body)
    res.json(cls)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function deleteClass(req: Request, res: Response) {
  try {
    const idParam = req.params.id
    const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam)
    await classService.deleteClass(id)
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}