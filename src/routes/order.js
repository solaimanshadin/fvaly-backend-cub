const router    =   require('express').Router();
const orderController    =   require('../controllers/orderController');
const accessControl = require('../accessControl');
const passport = require('passport');

router.post('/', 
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('createOwn', 'order'),
	orderController.createOrder
);

router.delete('/:id',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('deleteAny', 'order'),
	orderController.deleteOrder
);

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('readAny', 'order'),
	orderController.getOrderById
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('readAny', 'order'),
	orderController.getOrders
);

router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	accessControl.grantAccess('updateAny', 'order'),
	orderController.updateOrder,

);


module.exports = router;