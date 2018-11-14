
const express = require("express");
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

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

router.post('/login', (req, res, next) => {
  let fetchedUser; // Varible to get (user) to 2nd then block
  User.findOne({ email: req.body.email }) // locating instance of User in the data base
    .then(user => {
      // console.log(user);
      if (!user) {
        return res.status(401).json({
          message: 'Authorization Failed!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
  .then(result => {
    // console.log(result);
    if (!result) {
      return res.status(401).json({
        message: 'Authorization Failed!'
      });
    }
    const token = jsonWebToken.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      'here_is_where_u_place_a_string_2b_hashed', // also located in compare-auth.js
      {expiresIn: '1h'}
    );
    // console.log(token);
    res.status(200).json({
      token: token // look in auth.service comment | response property?
    });
  })
    .catch(err => {
      // console.log(err);
      return res.status(401).json({
        message: 'Authorization Failed!'
      });
    });
});

module.exports = router;

