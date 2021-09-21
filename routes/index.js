var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const {User,Story,Topic,Like,Follow} = require('../db/models');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  const stories = await Story.findAll({include:[Topic,User]})
  res.render('index', { title: 'Feed',stories })

}));



module.exports = router;
