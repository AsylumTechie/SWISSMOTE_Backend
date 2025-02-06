const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the authorization header
  
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, 'JWT_SECRET'); // Verify the token with your secret
    req.userId = decoded.id; // Attach the user ID to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
