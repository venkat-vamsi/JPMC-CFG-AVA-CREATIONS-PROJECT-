import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminPage = () => {
  return (
    <div>
      <NavbarAdmin />
      <div
        style={{
          padding: "40px",
          backgroundColor: "#f0fff4",
          minHeight: "90vh",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h1 style={{ color: "#256029", fontSize: "32px", marginBottom: "20px" }}>
          Welcome to the Admin Dashboard
        </h1>
        <p style={{ fontSize: "18px", color: "#3e5545", lineHeight: "1.6" }}>
          Here you can manage all your product categories, view and process
          orders, monitor Ava Sakhi initiatives, and handle website content.
          Use the top navigation bar to explore different admin functionalities.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
