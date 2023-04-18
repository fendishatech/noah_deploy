// Limit login attempts to max 10 for 15 minutes
const loginLimiter15 = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many login attempts, please try again in 15 minutes",
});

// Limit login attempts to max 5 for 1 hour
const loginLimiter60 = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many login attempts, please try again in 1 hour",
});

// Limit login attempts to max 3 for 24 hours
const loginLimiter24 = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3,
  message: "Too many login attempts, please try again in 24 hours",
});
