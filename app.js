const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter.js")

const app = express();
mongoose.set('strictQuery', false);

 mongoose.connect("mongodb+srv://deepak13kn:Deepak123@cluster0.y6bblgl.mongodb.net/studentData",{useNewUrlParser: true});




app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use("/", homeRouter);


app.listen("3000", function(req,res){
  console.log("server is running in3000");
});
