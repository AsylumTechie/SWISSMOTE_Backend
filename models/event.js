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
  attendees: {
    type: [String], 
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true, 
  },
});

module.exports = mongoose.model('Event', eventSchema);

