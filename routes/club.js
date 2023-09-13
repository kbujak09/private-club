const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');

router.get('/', (req,res) => res.render('index'))
router.get('/sign-up', user_controller.user_sign_in_get);
router.post('/sign-up', user_controller.user_sign_in_post);
router.get('/log-in', user_controller.user_log_in_get);
router.post('/log-in', user_controller.user_log_in_post);
router.get('/log-out', user_controller.user_log_out_get);

module.exports = router;
