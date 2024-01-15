const User = require("../models/users");

//Render sign in page
module.exports.signinPage = function (req, res) {
  if (req.isAuthenticated()) {
    //The user is already signed in, so give a warning to the client
    req.flash("error", "Please sign out to go to sign in page");
    return res.redirect("back");
  }
  //else render the sign in page
  return res.render("sign_in", {
    title: "Sign in",
  });
};

//Render registration page
module.exports.registrationPage = function (req, res) {
  if (req.isAuthenticated()) {
    //Signed in user cannot access the user-registration page
    req.flash("error", "Please sign out to go to registration page");
    return res.redirect("back");
  }
  //else render the registration page
  return res.render("registration", {
    title: "Registration",
  });
};

//Create employee
module.exports.createUser = async function (req, res) {
  try {
    //check if a user with the same username already exists
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      req.flash("error", "Username already exists, please sign-in");
      return res.redirect("/user/sign-in");
    } else {
      //Check if password and confirm password are same
      if (req.body.password == req.body.confirm_password) {
        await User.create({
          name: req.body.name,
          DOB: req.body.dob,
          gender: req.body.gender,
          phone_number: req.body.phone_number,
          DOJ: req.body.doj,
          username: req.body.username,
          password: req.body.password,
        });
        req.flash("success", "Successfully registered");
        return res.redirect("/user/sign-in");
      } else {
        //password and confirm password do not match, so give the client a warning
        req.flash("error", "Passwords do not match, please enter again");
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "***Error***");
    return res.redirect("back");
  }
};

//Create session
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

//Clear session
module.exports.clearSession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      req.flash("error", "Could not log you out");
      return res.redirect("back");
    }
    req.flash("success", "You have logged out succesfully");
    return res.redirect("/user/sign-in");
  });
};

//controller to render the user details page
module.exports.detailsPage = async function (req, res) {
  try {
    //get the user
    let user = await User.findById(req.params.id);
    //render the user details page and pass the user along
    return res.render("user_details", {
      title: "Personal details",
      user: user,
    });
  } catch (err) {
    console.log(err, "***Error occured in rendering the details page***");
    return res.redirect("back");
  }
};
