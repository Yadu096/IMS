const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/IMS");

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Could not connect to the Mongo DB")
);

db.once("open", function () {
  console.log("Successfully connected to Mongo DB");
});
