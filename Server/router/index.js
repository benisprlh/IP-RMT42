const router = require('express').Router();
const users = require('./user');
const teams = require('./teams');
const { errorHandler } = require('../auth');

router.use('/users', users);
router.use('/teams', teams);
router.use(errorHandler);

module.exports = router;
