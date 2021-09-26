const express = require('express');
const { User, Story, Topic, Like, Follow, Comment } = require('../db/models');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const checkPermissions = (story, currentUser) => {
  if (story.userId !== currentUser.id) {
    const err = new Error('Illegal operation.');
    err.status = 403; // Forbidden
    throw err;
  }
};

//---------------Validators-------------------------------------------------------------------------
const commentValidator = [
  check('body')
  .exists({ checkFalsy: true })
  .withMessage('Comment body must exist.')
]
//--------------------------------------------------------------------------------------------------


const commentNotFoundError = (id) => {
  const err = Error(`Comment with id of ${id} could not be found.`);
  err.title = "Comment not found.";
  err.status = 404;
  return err;
}

router.post('/stories/:id(\\d+)/likes',
  requireAuth,
  asyncHandler( async(req, res) => {
    const storyId = await parseInt(req.params.id, 10);
    const userId = res.locals.user.id;

    const aLike = await Like.findOne({
      where: {
        storyId,
        userId
      }
    });

    let likesCount = await Like.count({
      where: {
        storyId: storyId
      }
    })

    if (aLike) {
      await aLike.destroy();
      likesCount--
      res.status(200)
      res.json({ likesCount })
    } else {
      const newLike = await Like.create({
        storyId,
        userId
      })
      likesCount++
      res.status(200)
      res.json({ likesCount })
    }
  })
)

router.post(
  "/comments/:id(\\d+)/edit",
  requireAuth,
  commentValidator,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(commentId);
    console.log(comment)
    if (comment) {
      await comment.update({ body: req.body.body });
      res.json({ comment });
    } else {
      next(commentNotFoundError(commentId));
    }

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
    }
}))

router.delete(
  "/comments/:id(\\d+)/delete",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.status(204).end();
    } else {
      next(commentNotFoundError(commentId));
    }
  })
);

module.exports = router;
