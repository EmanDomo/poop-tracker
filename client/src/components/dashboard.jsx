import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for Vite
import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in first!");
      navigate("/login");
      return;
    }

    try {
      // Decode token to get user details
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow">
        <h2 className="text-center">Welcome, {username}!</h2>
      </Card>
    </Container>
  );
};

export default Dashboard;
