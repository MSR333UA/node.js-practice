const express = require('express');
const router = new express.Router();

const {
  registrationController,
  loginController,
} = require('../controllers/authController');

const {asyncWrapper} = require('../helpers/apiHelpers');

router.post('/registration', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));

module.exports = {authRouter: router};
