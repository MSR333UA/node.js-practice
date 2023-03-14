const express = require('express');
const router = new express.Router();

const {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require('../controllers/postsController');
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
  addPostValidation,
  // patchPostValidation,
} = require('../middlewares/validationMiddlewares');

router.get('/', asyncWrapper(getPostsController));
router.get('/:id', asyncWrapper(getPostByIdController));
router.post('/', addPostValidation, asyncWrapper(addPostController));
router.put('/:id', addPostValidation, asyncWrapper(changePostController));
// router.put("/:id", patchPostValidation);
router.delete('/:id', asyncWrapper(deletePostController));

module.exports = {routerRouter: router};
