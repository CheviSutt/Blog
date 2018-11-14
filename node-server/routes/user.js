
const express = require("express");
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/signUp', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash // never create a user w password: req.body.password | insecure
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'UserCreated',
            result: result
          });
        }).catch(err => {
          res.status(500).json({
            error: err
          });
      });
    });
});

module.exports = router;

