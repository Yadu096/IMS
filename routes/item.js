const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item_controller");

//route to render the details page
router.get("/details/:id", itemController.detailsPage);
//route to render the update-item page
router.get("/update_page/:id", itemController.updatePage);

module.exports = router;
