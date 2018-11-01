//
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
//
// const Post = require('./models/post'); // Imports mongoose schema
//
// const app = express();
//
// // mongodb connection name should be the plural of mongoose.model in post.js
// mongoose.connect('mongodb+srv://chevi:bR2yvRAbhPUiDdFw@cluster0-txgvm.mongodb.net/blog-post?retryWrites=true')
//   .then(() => {
//     console.log('Connected to mongodb!')
//   })
//   .catch(() => {
//     console.log('Connection failed!')
//   });
//
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Incoming request may have extra headers
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
//   next();
// });
//
// app.post("/posts", (req, res, next) => { // 201 = a new resource was created
//   const post = new Post({  // mongoose schema || Post variable above
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save(); // mongoose, see post.js
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });
//
// app.get("/posts", (req, res, next) => { // This is a REST API
//   Post.find().then(documents => {
//     console.log(documents);
//     res.status(200).json({ // 200 = everything ok || Next 3 lines need to bee in the .then block because its async
//       message: "Posts fetched successfully!",
//       posts: documents
//   }); // Grabs mongodb data
//   // const posts = [ // Dummy data used while building
//   //   {
//   //     id: "fadf12421l",
//   //     title: "First server-side post",
//   //     content: "This is coming from the server"
//   //   },
//   //   {
//   //     id: "ksajflaj132",
//   //     title: "Second server-side post",
//   //     content: "This is coming from the server!"
//   //   }
//   // ];
//   });
// });
//
// app.delete("/posts/:id", req, res, next) => { // dynamic path segment is --> :id(It can be named anything).
//   console.log()
// });
// module.exports = app;


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post"); // Imports mongoose schema

const app = express();

mongoose
  .connect('mongodb+srv://chevi:bR2yvRAbhPUiDdFw@cluster0-txgvm.mongodb.net/blog-post?retryWrites=true')
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Incoming request may have extra headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/posts", (req, res, next) => { // 201 = a new resource was created
  const post = new Post({ // mongoose schema || Post variable above
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/posts", (req, res, next) => { // This is a REST API
  Post.find().then(documents => {
    res.status(200).json({ // 200 = everything ok || Next 3 lines need to bee in the .then block because its async
      message: "Posts fetched successfully!",
      posts: documents
    }); // Grabs mongodb data
    // const posts = [ // Dummy data used while building
    //   {
    //     id: "fadf12421l",
    //     title: "First server-side post",
    //     content: "This is coming from the server"
    //   },
    //   {
    //     id: "ksajflaj132",
    //     title: "Second server-side post",
    //     content: "This is coming from the server!"
    //   }
    // ];
  });
});

app.delete("/posts/:id", (req, res, next) => { // dynamic path segment is --> :id(It can be named anything).
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;
