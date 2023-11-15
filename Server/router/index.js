const router = require('express').Router();
const users = require('./user');
const teams = require('./teams');

router.use('users', users);
router.use('teams', teams);

module.exports = router;
