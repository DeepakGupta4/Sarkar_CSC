import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addjob.css";
import axios from "axios";

const AddJob = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState("");
  const [price, setPrice] = useState("");
  const [applicationLink, setApplicationLink] = useState(""); // ✅ New State for Application Link

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobTitle || !company || !location || !salary || !description || !documents || !price || !applicationLink) {
      alert("Please fill in all fields.");
      return;
    }

    const newJob = { jobTitle, company, location, salary, description, documents, price, applicationLink };

    try {
      const response = await axios.post("http://localhost:4000/api/jobs/add", newJob);

      if (response.status === 201) {
        alert("Job added successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error adding job");
    }

    // Reset Form
    setJobTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setDescription("");
    setDocuments("");
    setPrice("");
    setApplicationLink(""); // ✅ Reset application link field
  };

  return (
    <div className="add-job-container">
      <div className="add-job-card">
        {/* Close button to navigate to Dashboard */}
        <div className="close-btn" onClick={() => navigate("/")}>✖</div>
        
        <h2>📌 Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
            <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Job Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="number" placeholder="Salary (₹)" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>

          <div className="form-group">
            <textarea placeholder="Required Documents (e.g., Resume, ID Proof)" value={documents} onChange={(e) => setDocuments(e.target.value)} required></textarea>
            <input type="number" placeholder="Service Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          
          <input type="text" placeholder="Application Link (URL)" value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} required /> {/* ✅ New Field */}

          <button type="submit">🚀 Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
