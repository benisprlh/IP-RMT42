const { authentication, authorization } = require('../auth');
const ControllerTeam = require('../controllers/controllerTeam');

const router = require('express').Router();

router.use(authentication);
router.get('/all', ControllerTeam.getTeam);
router.put('/update/:teamId', authorization, ControllerTeam.updateTeam);
router.delete('/delete/:teamId', authorization, ControllerTeam.deleteTeam);
router.get('/:teamId', ControllerTeam.getTeamById);

module.exports = router;
