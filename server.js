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
  res.status(201).send(myObj);
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

// For one comment

// likes
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);
  // if (id < myObj.length) {
  //   res.send(myObj[id]);
  // }

  // console.log(myObj[id].Likes);
  const update = req.body;

  console.log(update);

  myObj[id].Likes = update.Likes;

  // myObj[id].Likes = heartCounter;

  const newUpdate = JSON.stringify(myObj);
  fs.writeFile("./data/data.json", newUpdate, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});



app.patch("/emoji1/:id", (req, res) => {
  const id = req.params.id;
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);
  // if (id < myObj.length) {
  //   res.send(myObj[id]);
  // }

  const update = req.body;

  console.log(update);

  myObj[id].EmojiOne = update.EmojiOne;

  // myObj[id].Likes = heartCounter;

  const newUpdate = JSON.stringify(myObj);
  fs.writeFile("./data/data.json", newUpdate, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

//Emoji2

app.patch("/emoji2/:id", (req, res) => {
  const id = req.params.id;
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);
  // if (id < myObj.length) {
  //   res.send(myObj[id]);
  // }

  const update = req.body;

  console.log(update);

  myObj[id].EmojiTwo = update.EmojiTwo;

  // myObj[id].Likes = heartCounter;

  const newUpdate = JSON.stringify(myObj);
  fs.writeFile("./data/data.json", newUpdate, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

//emoji3

app.patch("/emoji3/:id", (req, res) => {
  const id = req.params.id;
  const currentData = fs.readFileSync("./data/data.json");
  const myObj = JSON.parse(currentData);
  // if (id < myObj.length) {
  //   res.send(myObj[id]);
  // }

  const update = req.body;

  console.log(update);

  myObj[id].EmojiThree = update.EmojiThree;

  // myObj[id].Likes = heartCounter;

  const newUpdate = JSON.stringify(myObj);
  fs.writeFile("./data/data.json", newUpdate, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

// app.get("/:id", (req, res) => {
//   const id = req.params.id - 1;
//   const currentData = fs.readFileSync("./data/data.json");
//   const myObj = JSON.parse(currentData);
//   if (id < myObj.length) {
//     res.send(myObj[id]);
//   } else {
//     res.status(404).send("Not Found!");
//   }
// });

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
   res.status(201).send(myObj);
});

app.get("/comments", (req, res) => {
  res.send(
    fs.readFileSync("./data/comments.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        // res.status(404).send(err);
        return;
      }
      console.log("File data:", jsonString);
      // res.status(200);
    })
  );
});

module.exports =  {app};
