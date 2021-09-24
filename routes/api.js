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

const commentValidator = [
  check('message')
      .exists({ checkFalsey: true })
      .withMessage('Comment must contain written content.')
]

const commentNotFoundError = (id) => {
  const err = Error(`Comment with id of ${id} could not be found.`);
  err.title = "Comment not found.";
  err.status = 404;
  return err;
}

// router.get(
//   "/stories/:id(\\d+)/comments",
//   asyncHandler(async (req, res, next) => {
//     const comments = await Comment.findAll();


//     res.json({ comments });


//   })
// );

// router.post(
//   "/stories/:id(\\d+)/comments",
//   requireAuth,
//   commentValidator,
//   asyncHandler(async (req, res) => {
//     const { body } = req.body;
//     const newComment = await Comment.create({ body });
//     res.status(201).json({ newComment });
//   })
// );


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
