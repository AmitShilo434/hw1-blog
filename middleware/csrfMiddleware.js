const { verifyCSRFToken } = require('../lib/csrf.js');

// Express middleware to verify CSRF token
function csrfMiddleware(req, res, next) {
  const csrfToken = req.body.csrfToken; // Assuming the token is sent in the request body
  if (!verifyCSRFToken(req.session.csrfSecret, csrfToken)) {
    return res.status(403).send('Invalid CSRF token');
  }
  next();
}

// Use the middleware for routes that require CSRF protection
app.post('/protected-route', csrfMiddleware, (req, res) => {
  // Process the request
});