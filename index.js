const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const timeLogger = (req,res,next) => {
    const startTime = new Date().getTime();
    console.log(startTime);
    next();
    const endTime = new Date().getTime();
    console.log(endTime);
    console.log(endTime-startTime);
}

app.use(timeLogger);


const authenticationMiddleware = (req,res,next) => {
    if(req.query.name === "admin" ){
        next();
    }
    else{
        res.send("Not autherised");
    }
}

app.get("/",(req,res)=>{
    const result = fs.readFileSync("./db.txt","utf-8")
    res.send(result);
})

app.get("/contact", authenticationMiddleware,(req,res)=>{
    res.send("contact");
})

app.listen(7500, () => {
    console.log("Listening to port 7500");
})