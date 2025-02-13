// socketHandler.js
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinEvent", async (eventId) => {
      try {
        const event = await Event.findById(eventId);
        if (!event) {
          socket.emit("eventNotFound", { message: "Event not found" });
        } else {
          event.attendees += 1;
          await event.save();
          io.emit("eventJoined", {
            eventId: event._id,
            attendees: event.attendees,
          });
          socket.emit("joinSuccess", { message: "Event joined successfully!" });
        }
      } catch (error) {
        console.error("Error joining event:", error);
        socket.emit("error", { message: "Failed to join event" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = socketHandler;
