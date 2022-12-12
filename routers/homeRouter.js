const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema.js");


Router.get("/",function(err,res){
  res.render("register", {title: "Fill Form", password:"",email:""});
});

Router.post("/register", async(req, res)=>{
  try{
const {
  name,
  number,
  email,
   password,
    cpassword
}= req.body;
  if(password === cpassword){
    const userData = new homeSchema({
      name,
      number,
      email,
       password,
    });
    userData.save(err=>{
      if(err) {
      console.log("err");
      }else{
        res.render("register", {title: "Done", password:"",email:""});
      }
    });
   const useremail = await homeSchema.findOne({email:email});
   if(email === useremail.email){
     res.render("register", {title: "", password:"",email:"Email is already exist please try with new email"});
   }else{
     console.log("error");
   }
  }else {
    res.render("register", {title: "", password:"Password Not Match!",email:""});
  }
  }catch(error){
    res.render("register", {title: "Error in code", password:"",email:""});
  }
});

//signin
  Router.post("/login", (req , res)=>{
    const {
      email,
      password
    } = req.body;

    homeSchema.findOne({email:email},(err, result)=>{
      if(email === result.email  && password === result.password){
        res.render("dashboard",{name: result.name});
      }else{
        res.render("register", {title: "Email or password is wrong please try again", password:"",email:""});

      }
    });
  });

module.exports = Router;
