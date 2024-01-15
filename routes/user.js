const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("passport");

//routes to render pages
router.get("/sign-in", userController.signinPage);
router.get("/registration", userController.registrationPage);

//route to create user in the db
router.post("/create-user", userController.createUser);

//route to sign in a user
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);
//route to sign out a user
router.get("/clear-session", userController.clearSession);

//route to render the user details page
router.get("/details/:id", userController.detailsPage);

module.exports = router;
