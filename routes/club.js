const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', controller.index)
router.get('/sign-up', controller.user_sign_in_get);
router.post('/sign-up', controller.user_sign_in_post);
router.get('/log-in', controller.user_log_in_get);
router.post('/log-in', controller.user_log_in_post);
router.get('/log-out', controller.user_log_out_get);
router.get('/membership', controller.user_membership_get);
router.post('/membership', controller.user_membership_post);


module.exports = router;
