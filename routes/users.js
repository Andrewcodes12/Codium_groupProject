const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User,Story,Topic,Like,Follow} = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
/* GET users listing. */

// Checking users input on form
const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email')
    .isLength({ max: 255 })
    .withMessage('Email  must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email  is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email  is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
];
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Checking login 
const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email '),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route to get the login form
router.get('/login', csrfProtection, asyncHandler( async(req, res) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  })
}));
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route for logging in the user if their creditonals are correct
router.post('/login', csrfProtection, loginValidators, asyncHandler( async(req, res) => {
  const {
    email,
    password
  } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {

    const user = await User.findOne({ where: { email } });

    if (user !== null) {

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {

        loginUser(req, res, user);
        return res.redirect('/');
      }
    }

    errors.push('Incorrect email or password, login failed');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken(),
  });

}));
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route for gettting the signup form
router.get('/signup', csrfProtection, userValidators, asyncHandler( async(req, res) => {
  const user = await User.build();
  res.render('signup', {
    title: 'Signup',
    user,
   csrfToken: req.csrfToken(),
  });
}));
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route for logging-out a user
router.post('/logout',asyncHandler (async(req, res) => {
  logoutUser(req, res)
  return req.session.save(() => res.redirect('/'))
}))
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route for posting the the signup form to teh database
router.post('/signup',
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
      const {
        email,
        firstName,
        lastName,
        password,
      } = req.body;

      const user = User.build({
        email,
        firstName,
        lastName,
      });

      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.hashedPassword = hashedPassword;
        await user.save();
        loginUser(req, res, user);
        res.redirect('/');
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('signup', {
          title: 'Signup',
          user,
          errors,
          csrfToken: req.csrfToken(),
        });
      }
}));
//--------------------------------------------------------------------------------------------------------------------------------------------------
// Route for loggin in the demo user
router.post('/login/demoUser', asyncHandler( async(req, res) => {
  const demoUser = await User.findByPk(1)
  loginUser(req, res, demoUser);
  return req.session.save(() => res.redirect('/'));
}));
//--------------------------------------------------------------------------------------------------------------------------------------------------


module.exports = router;
