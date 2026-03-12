import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import classRoutes from "./routes/class.routes";
import studentRoutes from "./routes/student.routes";
import attendanceRoutes from "./routes/attendance.routes";

dotenv.config();
const app = express();
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Class routes
app.use("/api/classes", classRoutes);

// Student routes
app.use("/api/students", studentRoutes);

// Attendance routes
app.use("/api/attendance", attendanceRoutes);

// Status route for monitoring
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Status page: http://localhost:${PORT}/api/status`);
});