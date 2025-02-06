const express = require("express");
const router = express.Router();
const Event = require("../models/event"); // Assuming you're using Mongoose for MongoDB
const verifyToken = require("../middleware/verifyToken");

// Create a new event
router.post("/events", verifyToken, async (req, res) => {
  const { eventName, description, date, time, category } = req.body;

  try {
    const newEvent = new Event({
      eventName,
      category,
      description,
      date,
      time,
      userId: req.userId, 
    });

    await newEvent.save(); // Save the event to the database
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

// Get all events
router.get('/get-event', verifyToken, async (req, res) => {
  
  try {
    const events = await Event.find({ userId: req.userId }); // Filter events by userId
    res.status(200).json(events); // Return the events as a JSON response
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});


module.exports = router;
