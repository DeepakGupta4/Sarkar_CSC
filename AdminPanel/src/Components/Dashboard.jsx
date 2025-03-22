import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import kiya
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalServices: 0,
    newRequests: 0,
  });

  const navigate = useNavigate(); // Navigation ke liye useNavigate hook

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/all-jobs/status");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard status:", error);
      }
    };

    fetchStats();
  }, []);

  // 🔹 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Token delete kar diya
    navigate("/admin/login"); // Redirect to login page
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li><Link to="/">🏠 Dashboard</Link></li>
          <li><Link to="/admin/jobs">➕ Total Job</Link></li>
          <li><Link to="/admin/services">🛠 Services</Link></li>
          <li><Link to="/admin/service-request">📩 Service Requests</Link></li>
          <li><Link to="/admin/job-applications">📄 Job Applications</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">🚪 Logout</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, Admin</h1>
          <p>Manage jobs, services, and settings easily from here.</p>
        </header>

        <section className="dashboard-widgets">
          <Link to="/admin/jobs" className="widget jobs">
            <i className="fas fa-briefcase"></i>
            <h3>Total Jobs</h3>
            <p>{stats.totalJobs}</p>
          </Link>
          <Link to="/admin/services" className="widget services">
            <i className="fas fa-cogs"></i>
            <h3>Total Services</h3>
            <p>{stats.totalServices}</p>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
