const express = require('express');
const router = new express.Router();

const {
  getPost,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/postsController');
const {
  addPostValidation,
  patchPostValidation,
} = require('../middlewares/validationMiddlewares');

router.get('/', getPost);
router.get('/:id', getPostById);
router.post('/', addPostValidation, addPost);
router.put('/:id', addPostValidation, changePost);
router.put('/:id', patchPostValidation);
router.delete('/:id', deletePost);

module.exports = {routerRouter: router};
