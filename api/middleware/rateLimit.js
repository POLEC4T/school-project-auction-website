const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 min in milliseconds
  max: 5,
  message: 'Vous avez dépassé le nombre de tentatives de connexion autorisées. Veuillez réessayer dans 5 minutes.', 
  statusCode: 429,
  headers: true,
});
module.exports = { loginRateLimiter }