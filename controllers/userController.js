const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.user_sign_in_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form');
})

exports.user_sign_in_post = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.redirect('/club/log-in');
    }
    catch(err) {
      return next(err);
    }
  })
});

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in_form', { user: req.user });
});

exports.user_log_in_post = 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error'
  })

  exports.user_log_out_get = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });