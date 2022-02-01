const { auth, logger } = require("../services");
const { auth: mockAuth } = require("../services/__mocks__");
const { mode } = require("../config");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
<<<<<<< HEAD
    const userClaims = await auth.verifyIdToken(bearerToken);
=======
    const userClaims =
      mode === "test"
        ? await mockAuth.verifyIdToken(bearerToken)
        : await auth.verifyIdToken(bearerToken);
>>>>>>> sanadriu/dev

    auth.login(req, userClaims);

    next();
  } catch (error) {
    logger.debug(error.message);

    res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
