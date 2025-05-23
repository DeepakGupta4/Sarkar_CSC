const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// 🔹 Middleware
app.use(express.json());

// ✅ Proper CORS Setup
app.use(
  cors({
    origin: [
      "https://sarkar-frontend.vercel.app",
      "https://admin-panel.vercel.app",
      "https://sarkar-frontend-git-main-deepakgupta4s-projects.vercel.app",
      "https://admin-panel-git-main-deepakgupta4s-projects.vercel.app" // ✅ Ye Admin panel ka origin add karo
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Global Headers Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
  next();
});



// 🔹 Import Routes
const authRoute = require("./Routes/authRoute.js");
const jobRoutes = require("./Routes/jobRoute.js");
const serviceRoutes = require("./Routes/serviceRoute.js");
const contactRoute = require("./Routes/contactRoute.js");
const allJobs = require("./Routes/allJobs.js");

// 🔹 Use Routes
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/all-jobs", allJobs);


// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Check if services exist, else insert default services
    const Service = require("./Model/servicModal.js");
    const existingServices = await Service.find();
    if (existingServices.length === 0) {
      await Service.insertMany([
        {
          name: "Aadhar Card Services",
          price: 50,
          description: "Update or apply for a new Aadhar card.",
          icon: "📑",
        },
        {
          name: "PAN Card Services",
          price: 100,
          description: "Apply for a new PAN card.",
          icon: "💳",
        },
        {
          name: "Voter ID Services",
          price: 75,
          description: "New registration and corrections.",
          icon: "🗳️",
        },
        {
          name: "Driving License",
          price: 500,
          description: "Apply for a new driving license.",
          icon: "🚗",
        },
        {
          name: "Banking Services",
          price: 0,
          description: "Open new bank accounts.",
          icon: "🏦",
        },
      ]);
      console.log("✅ Initial services added!");
    }
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Default Route (Check API is Working)
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// 🔹 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
