const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,  // Ensures email is required
//     // unique: true     // Makes sure the email is unique
//   },
//   password: {
//     type: String,
//     required: true,  // Ensures password is required
//   }
// });

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
