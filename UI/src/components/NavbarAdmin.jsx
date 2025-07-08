import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  return (
    <nav
      style={{
        backgroundColor: "#e6f4ea",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px", color: "#256029" }}>
        Admin Panel
      </div>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "30px",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/home" style={linkStyle}>Home</Link>
        </li>
        <li>
          <Link to="/product" style={linkStyle}>Products</Link>
        </li>
        <li>
          <Link to="/orders" style={linkStyle}>Orders</Link>
        </li>
        {/* <li>
          <Link to="/ava-sakhi" style={linkStyle}>Ava Sakhi</Link>
        </li> */}
        <li>
          <Link to="/advisor" style={linkStyle}>Advisory</Link>
        </li>
        <li>
          <Link to="/user-feedback" style={linkStyle}>User Feedback</Link> {/* ✅ NEW */}
        </li>
      </ul>
    </nav>
  );
};

const linkStyle = {
  color: "#256029",
  textDecoration: "none",
};

export default NavbarAdmin;
