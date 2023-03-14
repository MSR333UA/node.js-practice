const express = require('express');
const router = new express.Router();

const {
  getPost,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/postsController');
const {asyncWrapper} = require('../helpers/apiHelpers');
const {
  addPostValidation,
  // patchPostValidation,
} = require('../middlewares/validationMiddlewares');

router.get('/', asyncWrapper(getPost));
router.get('/:id', asyncWrapper(getPostById));
router.post('/', addPostValidation, asyncWrapper(addPost));
router.put('/:id', addPostValidation, asyncWrapper(changePost));
// router.put("/:id", patchPostValidation);
router.delete('/:id', asyncWrapper(deletePost));

module.exports = {routerRouter: router};
