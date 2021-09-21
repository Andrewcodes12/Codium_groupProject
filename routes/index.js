var express = require('express');
var router = express.Router();
const {Comment,Follow,Like,Story,Topic,User} = require('../db/models');
const { asyncHandler } = require('./utils');

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  const stories = await Story.findAll({include:[Topic,User]})
  res.render('index', { title: 'Feed',stories })

}));




module.exports = router;
