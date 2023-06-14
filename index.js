//Importing the dotenv module
require('dotenv').config();

//Importing the express module
const express = require('express');

//Initializing the file system
const fs = require('fs');

//Initializing the express and port number
const app = express();
const PORT = process.env.PORT || 4000;

// Calling the express.json() method for parsing
app.use(express.json());

app.get("/", (req, res) => {
    res.send("NodeJS File System Task");
});

// To creating a textfile in particular directory
if(!fs.existsSync("timestamps")){
    fs.mkdirSync("timestamps");
};

app.get("/create", (req, res) => {
    const dateTime = new Date();
    const value = `${dateTime.toISOString()}`.slice(0, 19).replace(/:/g, "-")
    // console.log("ts:",ts);
    fs.writeFile(`./timestamps/${value}.txt`, `${dateTime}`, (err) => {
        if(err){
         console.log("Error:",err);
        }
        else{
            console.log("file is generated successfully")
        };
       
    })
    res.send("File is created sucessfully ")
})

// for getting the all data
app.get("/allfiles", (req, res) => {
    let allFiles = fs.readdirSync("./timestamps");
    console.log(allFiles);
    res.send(allFiles);
  });


// Listening to the port
app.listen(PORT, () => {
    console.log("Server is listening on PORT", PORT);
});