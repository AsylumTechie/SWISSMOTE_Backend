const express = require("express");
const Event = require("../models/event");
const verifyToken = require("../middleware/verifyToken");

module.exports = (io) => {
  const router = express.Router();
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
        attendees: [],
        userId: req.userId, 
      });

      await newEvent.save();
      res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  // Handle join event
router.post("/join-event", verifyToken, async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is already in the attendees list
    const isAttendee = event.attendees.includes(userId);
    let updateOperation;

    if (isAttendee) {
      // Remove the user from attendees
      updateOperation = { $pull: { attendees: userId } };
    } else {
      // Add the user to attendees
      updateOperation = { $addToSet: { attendees: userId } };
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId },
      updateOperation,
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(500).json({ message: "Failed to update event" });
    }

    // Emit the eventUpdated event
    io.emit("eventUpdated", { eventId: updatedEvent._id, attendees: updatedEvent.attendees });

    // Check if the user is now part of the event or not
    const isJoined = updatedEvent.attendees.includes(userId);

    res.status(200).json({
      message: isAttendee ? "Left the event successfully" : "Joined the event successfully",
      attendees: updatedEvent.attendees,
      isJoined, // Send the isJoined status
    });
  } catch (error) {
    console.error("Error toggling event join:", error);
    res.status(500).json({ message: "Failed to toggle event join" });
  }
});

  
  

  // Get all events
  router.get('/get-event', verifyToken, async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });

  return router;
};
