const { verifySignUp, rateLimit } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateLoginOrEmail,
      verifySignUp.checkRoleExists,
      rateLimit.loginRateLimiter
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
