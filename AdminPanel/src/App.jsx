import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AddJob from "./Components/Jobs/Addjob";
import ServiceList from "./Components/Services/Addservice";
// import Addwork from "./Components/Work/Addwork";
import Login from "./Pages/Login";
import Jobapplication from "./Pages/Jobapplication";
import ServiceRequest from "./Pages/ServiceRequest";
import Register from "./Pages/Register";
import TotalJobs from "./Pages/TotalJob";
import AdminJobs from "./Components/Jobs/AdminJob";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/add-job" element={<AddJob />} />
        <Route path="/admin/services" element={<ServiceList />} />
        <Route path="/admin/job-applications" element={<Jobapplication />} /> 
        <Route path="/admin/service-request" element={<ServiceRequest />} /> 
        <Route path="/total-jobs" element={<TotalJobs />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />



        {/* <Route path="/addwork" element={<Addwork />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
