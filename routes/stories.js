const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, Story, Topic, Like, Follow, Comment } = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');


const checkPermissions = (story, currentUser) => {
  if (story.userId !== currentUser.id) {
    const err = new Error('Illegal operation.');
    err.status = 403;
    throw err;
  }
};

//---------------Validators-------------------------------------------------------------------------
const storyValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 50})
    .withMessage('Title must not be more than 50 characters long'),
  check('subtitle')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for subtitle')
    .isLength({ max: 50 })
    .withMessage('subtitle must not be more than 50 characters long'),
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Body')
    .isLength({ max: 1000 }),
  check('topic')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Topic')
];

const commentValidator = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Comment must contain written content.')
];
//--------------------------------------------------------------------------------------------------
// Route for getting a form to create a new story
router.get('/new',
  requireAuth,
  csrfProtection,
  asyncHandler(async(req, res, next) => {
  const topics = await Topic.findAll();
  res.render('new-story', { title: 'Share your thoughts!', topics,  csrfToken: req.csrfToken() })
}));
//--------------------------------------------------------------------------------------------------
// Route for creating a new Story
router.post('/new',
  requireAuth, csrfProtection,
  storyValidators,
  asyncHandler(async(req, res, next) => {
  const {
    title,
    subtitle,
    topic,
    body
  } = req.body;

  const story = Story.build({
    userId: req.session.auth.userId,
    title,
    subtitle,
    topicId: topic,
    body
  });

  console.log({topic});
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await story.save();
    res.redirect('/');
  } else {
    const topics = await Topic.findAll();
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('new-story', {
      title: 'Share your thoughts!',
      topics,
      story,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));
//--------------------------------------------------------------------------------------------------
// Route for getting a story at a particular storyId
router.get('/:id(\\d+)',
  csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId,{
      include: [Topic,User]
    });
    const comments = await Comment.findAll({
      where: {
        storyId: storyId
      },
      order: [["createdAt", "DESC"]],
      include: User
    });

    res.render('story',{
      story,
      comments,
      csrfToken: req.csrfToken(),
    })
  }));
//--------------------------------------------------------------------------------------------------
// Route for getting a edit form for a particular story via storyId
router.get('/edit/:id(\\d+)',
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);
    const topics = await Topic.findAll();

    checkPermissions(story,res.locals.user)

    res.render('story-edit', {
      title: 'Edit Story',
      topics,
      story,
      csrfToken: req.csrfToken(),
    });
  }));
//--------------------------------------------------------------------------------------------------
// Route for posting edit to a particular story via storyId
router.post('/edit/:id(\\d+)',
  requireAuth,
  csrfProtection,
  storyValidators,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const storyToUpdate = await Story.findByPk(storyId);

    checkPermissions(storyToUpdate,res.locals.user)

    const {
      title,
      subtitle,
      topic,
      body
    } = req.body;

    const story = {
      title,
      subtitle,
      topicId: topic,
      body
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await storyToUpdate.update(story);
      res.redirect('/');
    } else {
      const topics = await Topic.findAll();
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('story-edit', {
        title: 'Edit Story',
        story: { ...story, id:storyId },
        errors,
        topics,
        csrfToken: req.csrfToken(),
      });
    }
}));
//--------------------------------------------------------------------------------------------------
// Route for a GET request to delete a story at a particular storyId
router.get('/delete/:id(\\d+)',
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);

    checkPermissions(story,res.locals.user)

    res.render('story-delete', {
      title: 'Delete story',
      story,
      csrfToken: req.csrfToken(),
    });
}));
//--------------------------------------------------------------------------------------------------
// Route for a POST request to delete a story at a particular storyId
router.post('/delete/:id(\\d+)',
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);

    checkPermissions(story,res.locals.user)

    await story.destroy();
    res.redirect('/');
}));
//--------------------------------------------------------------------------------------------------
// Route for posting a comment to a particular story via storyId
router.post('/:id(\\d+)/comments',
  requireAuth,
  csrfProtection,
  commentValidator,
  asyncHandler(async (req, res) => {
    const { body } = req.body;
    const theStoryId = parseInt(req.params.id, 10);
    const comment = await Comment.build({ body, userId: req.session.auth.userId, storyId: theStoryId })
    const validationErrors = validationResult(req);

    const user = await User.findByPk(req.session.auth.userId);
    const { firstName, id: userId } = user;

    if (validationErrors.isEmpty()) {
      await comment.save();
      const { id, updatedAt } = comment;
      return res.status(201).json({
        id,
        userId,
        body,
        firstName,
        updatedAt: updatedAt.toDateString()
      })
    } else {
      const errors = validationErrors.array().map((error) => error.msg);
      return res.status(406).json({
        emptyComment: true
      });
    }
}));



module.exports = router;
