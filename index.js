const express = require("express");
const { dirname } = require("node:path");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const User= require("./models/user.js");

app.use(express.urlencoded({extended : true}));

main()
.then(()=> {"Connection Successful"})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

// let user1 = new User({
//     name: "Arshad Khan",
//     address: "Lakhimpur Kheri",
//     phoneNo: 7307423577,
//     cropName: "Wheat",
//     cropValue: "50 quintal"
// });

// user1.save().then((data)=>{
//     console.log(data);
// }).catch((err)=>{console.log(err)});

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.get("/Users", async (req,res) =>{
    let users = await User.find();
    res.render("userAdmin.ejs",{users});
    console.log(users);

});

app.get("/users/new",(req,res)=>{
    res.render("newUser.ejs");
});

app.post("/users", (req, res)=>{
    let {name, address, phoneNo, cropName, cropValue}= req.body;
    let newUser = new User({
        name: name,
        address: address,
        phoneNo: phoneNo,
        cropName: cropName,
        cropValue: cropValue
    });
    console.log(newUser);
    newUser.save().then(()=>{
        res.send("New User Created.");
    }).catch((err)=>{
        console.log(err);
    })
    
});
app.post("/login", (req, res)=>{
    let {id}= req.body

    let user= User.findById(id);
    user.then((data)=>{
        console.log("Got Data");
        //let user= data;
    }).catch((err)=>{
        console.log(err);
    })
    //res.end("Done");
    res.render("user.ejs", {user});
    //console.log(user.name);
    //console.log(user);
});

app.get("/farmer/login", (req, res)=>{
    res.render("farmerLogin.ejs");
})

app.get("/update/status", (req, res)=> {
    res.render("aptment.ejs");
})
app.listen(8080, ()=> {
    console.log("App is listening on port 8080.");
});