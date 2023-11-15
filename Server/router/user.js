const ControllerUser = require('../cotrollers/controllerUser');

const router = require('express').Router();

router.post('/register', ControllerUser.register);
router.post('/login', ControllerUser.login);

module.exports = router;
