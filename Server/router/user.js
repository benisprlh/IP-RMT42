const ControllerUser = require('../controllers/controllerUser');

const router = require('express').Router();

router.post('/register', ControllerUser.register);
router.post('/login', ControllerUser.login);

module.exports = router;
