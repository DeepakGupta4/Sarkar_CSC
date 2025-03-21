const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoute = require("../Backend/Routes/authRoute.js");
const jobRoutes = require("../Backend/Routes/jobRoute.js");
const serviceRoutes = require("../Backend/Routes/serviceRoute.js");
const serviceRequestRoutes = require("../Backend/Routes/serviceRequest.js");
const contactRoute = require("../Backend/Routes/contactRoute.js");
const Service = require("./Model/servicModal.js");
const allJobs = require("../Backend/Routes/allJobs.js");

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Routes
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/all-jobs", allJobs);

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB Connected");
    
    // Add initial services if none exist
    const existingServices = await Service.find();
    if (existingServices.length === 0) {
      await Service.insertMany([
        { name: "Aadhar Card Services", price: 50, description: "Update or apply for a new Aadhar card.", icon: "📑" },
        { name: "PAN Card Services", price: 100, description: "Apply for a new PAN card.", icon: "💳" },
        { name: "Voter ID Services", price: 75, description: "New registration and corrections.", icon: "🗳️" },
        { name: "Driving License", price: 500, description: "Apply for a new driving license.", icon: "🚗" },
        { name: "Banking Services", price: 0, description: "Open new bank accounts.", icon: "🏦" }
      ]);
      console.log("✅ Initial services added!");
    }
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
