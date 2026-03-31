import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized - user not found' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ message: 'Not authorized - account deactivated' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized - invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized - no token provided' });
  }
};

// Restrict to specific roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Not authorized - insufficient permissions'
      });
    }
    next();
  };
};

// Admin only middleware - combines protect + restrictTo admin
export const admin = async (req, res, next) => {
  // First check if user is authenticated
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized - user not found' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ message: 'Not authorized - account deactivated' });
      }

      // Check if user has admin role
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized - admin access required' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized - invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized - no token provided' });
  }
};

// Optional auth - doesn't require token but sets user if present
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token invalid but continue without user
      req.user = null;
    }
  }
  next();
};