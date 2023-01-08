const router    =   require('express').Router();
const userController    =   require('../controllers/userController');
const accessControl = require('../accessControl');
const passport = require('passport');
const uploader = require('../lib/multer');

router.post('/', 
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('createAny', 'profile'),
	userController.createUser
);

router.patch('/:id', 
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('updateAny', 'profile'),
	userController.updateUser
);

router.delete('/:id',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('deleteAny', 'profile'),
	userController.deleteUser
);

router.get(
	'/:id',
	userController.getUserById
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('readAny', 'profile'),
	userController.getUsers,

);



module.exports = router;