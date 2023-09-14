const User = require('../models/user');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('index')
})

exports.user_sign_in_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up_form');
})

exports.user_sign_in_post = [
  body('username', 'Username must not be empty.')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed in the username')
    .trim()
    .isLength({min: 3})
    .withMessage('Username must contain at least 3 characters.')
    .escape(),
  body('password', 'Password must not be empty.')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed in the password')
    .trim()
    .isLength({min: 3})
    .withMessage('Password must contain at least 3 characters.')
    .escape(),
  body('confirmPassword', 'Passwords do not match.')
    .custom((value, { req }) => value === req.body.password),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          try {
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            });
            if (!errors.isEmpty()) {
              res.render('sign_up_form', {
                user: user,
                errors: errors.array()
              });
            }
            else {
              const result = await user.save();
              res.redirect('/club/log-in');
            }
          }
          catch(err) {
            return next(err);
          }
      })
    })
]

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log_in_form', { user: req.user });
});

exports.user_log_in_post = 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/club/log-in',
    failureMessage: true
  })

  exports.user_log_out_get = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });

  exports.user_membership_get = asyncHandler(async (req, res, next) => {
    res.render('membership');
  })

  exports.user_membership_post = asyncHandler(async (req, res, next) => {
    const value = req.body.secret;
    if (value === '7312') {
      await User.findByIdAndUpdate(req.user.id, { membership: true }, {})
      res.redirect('/')
    }
    else {
      res.redirect('/')
    }
  })

  exports.comment_create_get = []

  exports.comment_create_post = []