const express = require("express");
const bodyParser = require("body-parser");
const validator = require("email-validator");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("Public"));
app.use("/node_modules",express.static(__dirname + "/node_modules"));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin:admin%40123@cluster0.fagut8i.mongodb.net/AlgoMasterDB", {useNewUrlParser: true});

const userSchema = {
  email: String,
  password: String
};

const User = mongoose.model("user", userSchema);

app.get("/", function(req, res){
  res.render("index");
});

app.get("/studentLogin", function(req, res){
  res.render("studentLogin",{vis: "hidden", content: ""});
});

app.get("/register", function(req, res){
  res.render("register", {color: "red", visi: "hidden", content: ""});
});

app.get("/algorithms.html", function(req, res){
  res.sendFile(__dirname + "/algorithms.html");
});

app.post("/registration", function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if(!validator.validate(email)){
    res.render("register", {color: "red", visi: "inherit", content: "Invalid email"});
  }else{
    if(req.body.password != req.body.cpassword){
      res.render("register", {color: "red", visi: "inherit", content: "Password does not match"});
    }else{
      User.findOne({email: email}, function(err, userData){
        if(!err){
          if(!userData){
            const newUser = new User({email: email, password: password});
            newUser.save();

            res.render("register", {color: "#22AC00", visi: "inherit", content: "Successfully registered. Please sign to start learning."});
          }else{
            res.render("register", {color: "red", visi: "inherit", content: "User Already Exists"});
          }
        }else{
          console.log(err);
        }
      });
    }
  }
});

app.post("/signin", function(req, res){
  const email = req.body.email;
  const password = req.body.password;

  if(!validator.validate(email)){
    res.render("studentLogin", {vis: "inherit", content: "Incorrect Email or Password"});
  }else{
    User.findOne({email: email}, function(err, user){
      if(!err){
        if(user != null && password === user.password){
          res.redirect("/algorithms.html");
        }else{
          res.render("studentLogin", {vis: "inherit", content: "Incorrect Email or Password"});
        }
      }else console.log(err);
    });
  }
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000")
});
