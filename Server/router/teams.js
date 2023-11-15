const { authentication, authorization } = require('../auth');
const ControllerTeam = require('../controllers/controllerTeam');

const router = require('express').Router();

router.use(authentication);
router.get('/all', ControllerTeam.getTeam);
router.post('/add', authorization, ControllerTeam.addTeam);
router.put('/update/:teamId', authorization, ControllerTeam.updateTeam);
router.delete('/delete/:teamId', authorization, ControllerTeam.deleteTeam);
router.get('/:teamId', ControllerTeam.getTeamById);

module.exports = router;
