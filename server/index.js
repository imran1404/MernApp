const express = require('express');
const server = express();
const cors = require("cors");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

// Users is a class created by schema and The model "User" is the collection name of db table 

const Users = mongoose.model('User', userSchema);

server.use(cors())
server.use(bodyParser.json())

// server.get("/demo", (req,res)=>{
//     res.send(req)
// })

server.post("/demo", async (req,res)=>{
    // console.log(req.body)
    const user = new Users()
    user.username = req.body.username
    user.password = req.body.password
    const doc = await user.save();
console.log(doc)
    res.send(doc)
})

server.get("/demo", async (req,res)=>{
    const data1 = await Users.find({})
    console.log(data1)
    res.send(data1)
})

server.listen("8080", ()=>{
    console.log("server started")
})