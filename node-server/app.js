
const express = require("express");
const bodyParser = require("body-parser");

const Post = require('./models/post'); // Imports mongoose schema

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Incoming request may have extra headers
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/posts", (req, res, next) => { // 201 = a new resource was created
  const post = new Post({  // mongoose schema || Post variable above
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/posts", (req, res, next) => { // This is a REST API
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({ // 200 = everything ok
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
