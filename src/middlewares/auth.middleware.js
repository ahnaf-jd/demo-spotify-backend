const jwt = require('jsonwebtoken');

// Verify the JWT token from the request cookie and attach user claims to req.user.
function authenticateToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Enforce role-based access control for protected routes.
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: `Only ${role}s can access this route` });
    }

    next();
  };
}

module.exports = { authenticateToken, requireRole };
