
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept"); // Incoming request may have extra headers
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.use('/posts', (req, res, next) => { // This is a REST API

  const posts = [
    { id: 'fash2342',
      title: 'First server side post',
      content: 'This is coming from the server'
    },
    { id: 'gvsw0738',
      title: 'Second server side post',
      content: 'This is coming from the server also'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
    });
});

module.exports = app;
