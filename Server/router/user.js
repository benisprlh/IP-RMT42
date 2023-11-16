const ControllerUser = require('../controllers/controllerUser');

const router = require('express').Router();

router.post('/register', ControllerUser.register);
router.post('/login', ControllerUser.login);
router.post('/auth/google', ControllerUser.authG)

module.exports = router;
