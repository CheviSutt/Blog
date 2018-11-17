const express = require("express");
const multer = require('multer'); // Able to store images

const Post = require("../models/post");
const confirmAuth = require('../middleware/compare-auth.js');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'node-server/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension );
  }
});

router.post(
  "",
  confirmAuth, // executed in compare-auth.js
  multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      // postId: createdPost._id
      post: {
        ...createdPost,
        id: createdPost._id
        // title: createdPost.title, // These 3 lines are accomplished with '...createdPost'
        // content: createdPost.content,
        // imagePath: createdPost.imagePath
      }
    });
  });
});

router.put(
  '/:id',
  confirmAuth, // executed in compare-auth.js
  multer({storage: storage}).single('image'), (req, res, next) => {
  // console.log(req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  // console.log(post);
  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "Not Authorized!"});
    }
  });
 }
);

router.get("", (req, res, next) => {
  // req.query;// Query Parameters in URL // console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) { // Selects amount of Posts from database
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => { // Selects all Posts from database
    fetchedPosts = documents;
    return Post.count(); // Opposite of Post.find() above
  })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts, // was documents
        maxPosts: count
      });
    });
});

router.get("/:id", (req, res, next) => { // called from "client" posts.service
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'});
    }
  })
});

router.delete("/:id", confirmAuth, // executed in compare-auth.js
  (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    // console.log(result);
    if (result.n > 0) {
      res.status(200).json({message: "Deleted successfully!"});
    } else {
      res.status(401).json({message: "Not Authorized!"});
    }
  });
});

module.exports = router;


