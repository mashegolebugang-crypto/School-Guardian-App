import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [section, setSection] = useState("home");

  const renderContent = () => {
    if (section === "students") return <h2>Students</h2>;
    if (section === "classes") return <h2>Classes</h2>;
    if (section === "attendance") return <h2>Attendance</h2>;
    return <h2>Welcome to SchoolGuardian</h2>;
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "#1e293b",
          padding: "20px",
          color: "white"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>SchoolGuardian</h2>

        <button style={btn} onClick={() => setSection("home")}>Dashboard</button>
        <button style={btn} onClick={() => setSection("students")}>Students</button>
        <button style={btn} onClick={() => setSection("classes")}>Classes</button>
        <button style={btn} onClick={() => setSection("attendance")}>Attendance</button>

        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          color: "white"
        }}
      >
        {renderContent()}
      </div>

    </div>
  );
};

const btn = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  background: "#334155",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const logoutBtn = {
  ...btn,
  background: "#ef4444"
};

export default Dashboard;