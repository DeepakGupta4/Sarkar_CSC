const express = require("express");
const { body, validationResult } = require("express-validator"); // ✅ Input validation
const Service = require("../Model/servicModal.js");

const router = express.Router();

// ✅ Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not fetch services." });
  }
});

// ✅ Get a Single Service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: "Invalid service ID" });
  }
});

// ✅ Add a New Service
router.post("/add", async (req, res) => {
  try {
    const { name, price, description, documents, icon } = req.body;
    const newService = new Service({ name, price, description, documents, icon });
    await newService.save();

    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not add service." });
  }
});

module.exports = router;
