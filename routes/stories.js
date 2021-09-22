const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User,Story,Topic,Like,Follow} = require('../db/models');
const { loginUser, logoutUser } = require('../auth');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { requireAuth } = require('../auth');


const checkPermissions = (story, currentUser) => {
  if (story.userId !== currentUser.id) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
  }
};


router.get('/new', requireAuth, csrfProtection, asyncHandler(async(req, res, next) => {
  const topics = await Topic.findAll();
  res.render('new-story', { title: 'Share your thoughts!', topics,  csrfToken: req.csrfToken() })
}));

const storyValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('subtitle')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Subtitle')
    .isLength({ max: 100 })
    .withMessage('Subtitle must not be more than 100 characters long'),
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Body')
    .isLength({ max: 1000 }),

  check('topic')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Topic')
];

router.post('/new', requireAuth, csrfProtection, storyValidators, asyncHandler(async(req, res, next) => {
    const {
      title,
      subTitle,
      topic,
      body
    } = req.body;

    const story = Story.build({
      userId: req.session.auth.userId,
      title,
      subTitle,
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

router.get('/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId,{
      include: [Topic,User]
    })


    res.render('story',{
      story,
      csrfToken: req.csrfToken(),
    })
  }));


router.get('/edit/:id(\\d+)',requireAuth, csrfProtection,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);

    checkPermissions(story,res.locals.user)

    res.render('story-edit', {
      title: 'Edit Story',
      story,
      csrfToken: req.csrfToken(),
    });
  }));

  router.post('/edit/:id(\\d+)',requireAuth, csrfProtection, storyValidators,
  asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.id, 10);
    const storyToUpdate = await Story.findByPk(storyId);

    checkPermissions(storyToUpdate,res.locals.user)

    const {
      title,
      subTitle,
      topic,
      body
    } = req.body;

    const story = {
      title,
      subTitle,
      topicId: topic,
      body
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await storyToUpdate.update(story);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('story-edit', {
        title: 'Edit Story',
        story: { ...story, id:storyId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));



/* TODO:
styling
*/


module.exports = router;
