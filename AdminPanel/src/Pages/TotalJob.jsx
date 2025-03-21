import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./TotalJobs.css";

const TotalJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    axios.get("http://localhost:4000/api/jobs/")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="total-jobs-container">
      <h2>📋 Total Jobs</h2>
      
      {/* Go Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>🔙 Go Back</button>

      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TotalJobs;
