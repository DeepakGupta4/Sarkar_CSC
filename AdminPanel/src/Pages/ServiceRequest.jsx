import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceRequest.css";

const ServiceRequest = () => {
  const navigate = useNavigate();

  // Sample service requests (replace with backend API call later)
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe", service: "Aadhar Card Update", status: "Pending" },
    { id: 2, name: "Jane Smith", service: "PAN Card Application", status: "Approved" },
    { id: 3, name: "Mike Johnson", service: "Passport Application", status: "Rejected" },
  ]);

  // Function to update request status
  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
  };

  return (
    <div className="service-request-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Back to Dashboard
      </button>
      <h2>📌 Service Requests</h2>
      <table className="request-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req.id}>
              <td>{index + 1}</td>
              <td>{req.name}</td>
              <td>{req.service}</td>
              <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
              <td>
                <button onClick={() => handleStatusChange(req.id, "Approved")}>✅ Approve</button>
                <button onClick={() => handleStatusChange(req.id, "Rejected")}>❌ Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRequest;
