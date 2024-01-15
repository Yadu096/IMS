const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require("passport");

//route to render the home page only if the user is authenticated
router.get("/", passport.checkAuthentication, homeController.homePage);

router.use("/item", require("./item"));
router.use("/user", require("./user"));

module.exports = router;
