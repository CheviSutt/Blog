
const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => { // Typical looking middleware in express, its a function
  try {
    const token = req.headers.authorization.split(" ")[1];
    jsonWebToken.verify(token, "here_is_where_u_place_a_string_2b_hashed");
    next();
  } catch (error) {
    res.status(401).json({message: "Authorization Failed!!!!"});
  }
};


