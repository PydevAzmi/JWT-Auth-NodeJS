// AUTHENTICATION ROUTES
const {Router} = require('express');
const { model } = require('mongoose');
const authController = require("../controllers/authController");

const router = Router();

router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);
router.get('/users', authController.list_users);
router.get('/users/del/:id', authController.del_user);

module.exports = router;