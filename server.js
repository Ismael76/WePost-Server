const express = require("express");

const app = express();

const cors = require("cors");

const fs = require("fs");

const dayjs = require("dayjs");

const { json } = require("express");

app.use(cors());

app.use(express.json());

let postID = 1;
let likes = 0;
let emojiOne = 0;
let emojiTwo = 0;
let emojiThree = 0;

app.post("/", (req, res) => {
  //Storing JSON data in myObj
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);

  //Defining new data
  const formData = req.body;
  const data = {
    PostID: myObj.length,
    ...formData,
    Likes: likes,
    EmojiOne: emojiOne,
    EmojiTwo: emojiTwo,
    EmojiThree: emojiThree,
    Time: dayjs().format("D/M/YYYY h:mm A"),
  };
  const jsonString = JSON.stringify(data);

  //Adding new data to obj
  myObj.push(data);
  // myObj.sort((a, b) => b.PostID - a.PostID);

  //Writing to JSON file
  const newData = JSON.stringify(myObj);
  fs.writeFile("./data/data.json", newData, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

app.get("/", (req, res) => {
  res.send(
    fs.readFileSync("./data/data.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      console.log("File data:", jsonString);
    })
  );
});

//Comments

app.post("/comments", (req, res) => {
  //Storing JSON data in myObj
  const currentData = fs.readFileSync("./data/comments.json");
  const myObj = JSON.parse(currentData);
  //Defining new data
  const formData = req.body;
  const data = {
    ...formData,
    Time: dayjs().format("D/M/YYYY h:mm A"),
  };
  const jsonString = JSON.stringify(data);
  //Adding new data to obj
  myObj.push(data);
  //Writing to JSON file
  const newData = JSON.stringify(myObj);
  fs.writeFile("./data/comments.json", newData, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

app.get("/comments", (req, res) => {
  res.send(
    fs.readFileSync("./data/comments.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      console.log("File data:", jsonString);
    })
  );
});

app.get("/:id", (req, res) => {
  const id = req.params.id - 1;
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);

  if (id < myObj.length) {
    res.send(myObj[id]);
  } else {
    res.status(404).send("Not Found!");
  }
});

module.exports = { app };
