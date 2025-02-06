// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   date: Date,
//   attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// });

// module.exports = mongoose.model('Event', eventSchema);


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is a reference to the User collection
    ref: 'User',
    required: true, // Make sure it's required if your business logic needs it
  },
});

module.exports = mongoose.model('Event', eventSchema);

