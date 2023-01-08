const mongoose      =   require('mongoose');
const {Schema}      =   mongoose;
mongoose.Promise    =   global.Promise;

const OrderSchema    =   new Schema ({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	orderId: {
		type: Number,
		required: true
	},	
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	}],
	cart: [{
		
	}],
	shippingDetails: {
		shippingAddress: String,
		contactNumber: String
	},
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'verified', 'delivered', 'rejected']
	},
	totalAmount: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	
}, {timestamp: true});

module.exports = mongoose.model('Order', OrderSchema);