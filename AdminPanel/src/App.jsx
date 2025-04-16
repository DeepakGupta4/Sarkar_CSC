import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AddJob from "./Components/Jobs/Addjob";
import ServiceList from "./Components/Services/Addservice";
import Login from "./Pages/Login";
import Jobapplication from "./Pages/Jobapplication";
import TotalJobs from "./Pages/TotalJob";
import AdminJobs from "./Components/Jobs/AdminJob";
import ProtectedRoute from "./Middleware/ProtectionRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Redirect: Root "/" goes to "/admin/login" */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Public Routes */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <ServiceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/job-applications"
          element={
            <ProtectedRoute>
              <Jobapplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/total-jobs"
          element={
            <ProtectedRoute>
              <TotalJobs />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route (Unknown paths redirect to login) */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
