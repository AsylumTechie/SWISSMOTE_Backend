// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/event');

// exports.register = async (req, res) => {
//   const { username, password } = req.body;
  
//   // Check if user exists
//   const userExists = await User.findOne({ username });
//   if (userExists) return res.status(400).send('User already exists');
  
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, password: hashedPassword });
  
//   await user.save();
//   res.status(201).send('User registered');
// };

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
  
//   const user = await User.findOne({ username });
//   if (!user) return res.status(400).send('Invalid credentials');
  
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid credentials');
  
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };
