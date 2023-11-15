const router = require('express').Router();

router.get('/all');
router.get('/:teamId');
router.post('/add');
router.put('/update/:teamId');
router.delete('/delete/:teamId');

module.exports = router;
