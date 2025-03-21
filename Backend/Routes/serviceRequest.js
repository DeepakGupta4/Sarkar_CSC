const express = require("express");
const ServiceRequest = require("../Model/serviceRequest.js");
const router = express.Router();

// Add a Service Request
router.post("/request", async (req, res) => {
  try {
    const newRequest = new ServiceRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Service request submitted", request: newRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Requests
router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find().populate("userId").populate("serviceId");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Request Status
router.put("/update/:id", async (req, res) => {
  try {
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Request status updated", request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Request
router.delete("/delete/:id", async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
