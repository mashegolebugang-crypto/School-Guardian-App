// src/controllers/attendance.controller.ts
import { Request, Response } from "express";

let attendance: any[] = []; // in-memory storage

// GET /api/attendance
export const getAttendance = (req: Request, res: Response) => {
  res.json(attendance);
};

// POST /api/attendance
export const addAttendance = (req: Request, res: Response) => {
  const newEntry = {
    ...req.body,
    id: attendance.length + 1,
    date: new Date(),
  };
  attendance.push(newEntry);
  res.status(201).json(newEntry);
};