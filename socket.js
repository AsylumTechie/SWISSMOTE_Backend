// module.exports = (io) => {
//     io.on('connection', (socket) => {
//       console.log('A user connected');
      
//       // Example: Emit event when an attendee joins
//       socket.on('attendee-join', (eventId) => {
//         io.emit('attendee-updated', { eventId });
//       });
  
//       socket.on('disconnect', () => {
//         console.log('User disconnected');
//       });
//     });
//   };
  

// socket.js or wherever you define the handler
const socketHandler = (io) => {
    return (socket) => {
      console.log('A user connected');
      
      // Example event listener
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
  
      // You can listen for events from the client like this:
      socket.on('event_name', (data) => {
        console.log(data);
        // Respond to client
        socket.emit('response_event', { message: 'Event received' });
      });
    };
  };
  
  module.exports = socketHandler;
  