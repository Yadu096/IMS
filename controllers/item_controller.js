const Item = require("../models/items");

//Controller to render ietm-details page
module.exports.detailsPage = async function (req, res) {
  try {
    //get the item using the id from the params
    let item = await Item.findById(req.params.id);
    //render the item details page and send item along with it
    res.render("item_details", {
      title: item.name + " details",
      item: item,
    });
  } catch (err) {
    console.log(err, "***Error in rendering the item details***");
    return res.redirect("back");
  }
};

//Controller to render update page
module.exports.updatePage = async function (req, res) {
  try {
    //get the item
    let item = await Item.findById(req.params.id);
    //render the update item page and send item along with it
    return res.render("update_item", {
      title: "Update Page",
      item: item,
    });
  } catch (err) {
    console.log(err, "***Error in rendering the update-item page***");
    return res.redirect("back");
  }
};
