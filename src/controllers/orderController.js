const  {createResponse}   =   require('../utils/responseGenerate');
const  Order   		      =   require('../models/Order');
const { generateOrderId } = require('../helpers/orderIdGenerator');

module.exports.createOrder = async (req, res, next) => {
	
	try{
		const userId = req.user._id;
		const body = { ...req.body, userId };
		const orderId = await generateOrderId();
		body.orderId = orderId;
		const order = new Order(body);
		await order.save();
		return res.status(201).json(createResponse(order, 'Order placed successfully!', false));
	} catch(err) {
		next(err);
	}
};

module.exports.deleteOrder = async (req, res, next) => {
	try{
		const { id } = req.params;
		const order = await Order.deleteOne({_id: id});
		if(order.deletedCount) {
			return res.status(200).json(createResponse(null, 'Order Deleted successfully!', false));
		}
		return res.status(404).json(createResponse(null, 'No Order found with this Id!', true));
	} catch(err) {
		next(err);
	}
};

module.exports.getOrderById = async (req, res, next) => {
	try{
		const { id } = req.params;
		const order = await Order.findOne({_id: id}).populate('userId');
		if(!order) throw new Error('No order found with this id!');
		return res.json(createResponse(order));
	} catch(err){
		next(err);
	}
};

module.exports.getOrders = async (req, res, next) => {
	try{
		// if role === merchant , show his order only , if admin show all
		const query = req.query;
		const orders = await Order.find(query)
			.sort({'_id':  -1})
			.populate('userId');
		
		return res.json(createResponse(orders));
	} catch(err){
		next(err);
	}
};

module.exports.updateOrder = async (req, res, next) => {
	const {id} = req.params;
	const order = await Order.updateOne({_id: id}, req.body);
	return res.json(createResponse(order));
};