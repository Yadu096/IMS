const Item = require("../models/items");

module.exports.homePage = async function (req, res) {
  try {
    //delete all the documents from the collection before populating it again to protect duplicacy of data
    await Item.deleteMany({});
    //Fetch items from the API server running on the port 3000
    let reqAPI = await fetch("http://localhost:3000/api/v1/item/read");
    //convert the reqAPI to JSON
    let response = await reqAPI.json();
    //Now iterate over the data of the response from the API and add it in the local database
    for (let item of response.data) {
      await Item.create({
        name: item.name,
        id: item.id,
        qty: item.qty,
        price: item.price,
        category: item.category,
        supplierInfo: item.supplierInfo,
      });
    }
    //get all the items from the local DB and render the page
    let items = await Item.find({});
    if (req.isAuthenticated()) {
      //The user is signed in, show them the home page
      return res.render("home", {
        title: "Home Page",
        items: items,
      });
    }
    //User is not authenticated, so ask them to sign-in to access the home page
    req.flash("error", "Please login to visit the home page");
    return res.redirect("/user/sign-in");
  } catch (err) {
    console.log(err, "Error in rendering the home page");
    req.flash("error", "Error in rendering the home page, please try again");
    return res.redirect("back");
  }
};
