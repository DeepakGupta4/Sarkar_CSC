import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminJobs.css";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  // 🔹 Fetch Jobs from Backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Handle Delete Job
  const handleDeleteJob = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/jobs/delete/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // 🔹 Handle Edit Job
  const handleEditJob = (job) => {
    setEditingJob({ ...job });
  };

  // 🔹 Handle Update Job
  const handleUpdateJob = async () => {
    if (!editingJob) return;
    try {
      const response = await axios.put(
        `http://localhost:4000/api/jobs/update/${editingJob._id}`,
        editingJob
      );
      console.log(response.data.message);

      setJobs(jobs.map((job) => (job._id === editingJob._id ? editingJob : job)));
      setEditingJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="admin-container">
       
      <div className="admin-header">
      <Link to="/" className="back-buttonn">⬅ Back to Dashboard</Link>
        <Link to="/admin/add-job" className="add-job-button"><span>+</span> Add Job</Link>
      </div>
      <h1 className="admin-h1">Manage Jobs</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading jobs... ⏳</p>
      ) : (
        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="job-card">
                {editingJob?._id === job._id ? (
                  <div>
                    <input
                      type="text"
                      value={editingJob.jobTitle}
                      onChange={(e) => setEditingJob({ ...editingJob, jobTitle: e.target.value })}
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={editingJob.company}
                      onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={editingJob.location}
                      onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                      placeholder="Location"
                    />
                    <input
                      type="number"
                      value={editingJob.salary}
                      onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                      placeholder="Salary"
                    />
                    <button onClick={handleUpdateJob}>✅ Save</button>
                    <button onClick={() => setEditingJob(null)}>❌ Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h3>{job.jobTitle}</h3>
                    <p>🏢 {job.company}</p>
                    <p>📍 {job.location}</p>
                    <p>💰 ₹{job.salary}</p>
                    <button className="delete-button" onClick={() => handleDeleteJob(job._id)}>❌ Delete</button>
                    <button className="edit-button" onClick={() => handleEditJob(job)}>✏ Edit</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-jobs-message">No jobs available. Add a new job to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
