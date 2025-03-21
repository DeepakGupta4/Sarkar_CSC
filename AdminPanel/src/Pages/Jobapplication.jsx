import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Jobapplication.css';

const Jobapplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, setJobs } = location.state || { jobs: [], setJobs: () => {} };

  return (
    <div className="job-list-container">
      <button className="back-button" onClick={() => navigate("/")}>🔙 Back to Dashboard</button>
      <h2>📝 Job Listings</h2>
      <button onClick={() => navigate("/add-job", { state: { jobs, setJobs } })}>➕ Add Job</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id}>
              <td>{index + 1}</td>
              <td>{job.jobTitle}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.salary} ₹</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Jobapplication;
