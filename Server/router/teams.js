const ControllerTeam = require('../controllers/controllerTeam');

const router = require('express').Router();

router.get('/all', ControllerTeam.getTeam);
router.get('/:teamId', ControllerTeam.getTeamById);
// router.post('/add');
// router.put('/update/:teamId');
// router.delete('/delete/:teamId');

module.exports = router;
