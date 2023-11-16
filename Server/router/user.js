const { authentication } = require('../auth');
const ControllerMidtrans = require('../controllers/controllerMidtrans');
const ControllerUser = require('../controllers/controllerUser');

const router = require('express').Router();

router.post('/register', ControllerUser.register);
router.post('/login', ControllerUser.login);
router.post('/auth/google', ControllerUser.authG);
router.get('/payment/midtrans/token', authentication, ControllerMidtrans.getToken);
router.patch('/me/upgrade', authentication, ControllerUser.upgradeAccount);

module.exports = router;
