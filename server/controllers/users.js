const JWT = require('jsonwebtoken');
const User = require('../models/user');

signToken = user => {
  // return JWT.sign({
  //   iss: 'Joopiter',
  //   sub: user.id,
  //   iat: new Date().getTime(), // current time
  //   exp: new Date().setDate(new Date().getDate() + 14) // current time + 14 day ahead
  // }, process.env.JWT_SECRET);
  return JWT.sign({
    sub: user.id,
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

module.exports = {

  signUp: async (req, res, next) => {
    const { email, password } = req.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({ 
      method: 'local',
      local: {
        email: email, 
        password: password
      }
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  me: async (req, res, next) => {
    res.status(200).json({ user: req.user});
  }
}