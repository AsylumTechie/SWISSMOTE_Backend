const express = require("express");
const Event = require("../models/event");
const verifyToken = require("../middleware/verifyToken");

module.exports = (io) => {
  const router = express.Router();
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

    const isAttendee = event.attendees.includes(userId);
    let updateOperation;

    if (isAttendee) {
      updateOperation = { $pull: { attendees: userId } };
    } else {
      updateOperation = { $addToSet: { attendees: userId } };
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId },
      updateOperation,
      { new: true } 
    );

    if (!updatedEvent) {
      return res.status(500).json({ message: "Failed to update event" });
    }

    io.emit("eventUpdated", { eventId: updatedEvent._id, attendees: updatedEvent.attendees });

    const isJoined = updatedEvent.attendees.includes(userId);

    res.status(200).json({
      message: isAttendee ? "Left the event successfully" : "Joined the event successfully",
      attendees: updatedEvent.attendees,
      isJoined,
    });
  } catch (error) {
    console.error("Error toggling event join:", error);
    res.status(500).json({ message: "Failed to toggle event join" });
  }
});


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
