const  {createResponse}   =   require('../utils/responseGenerate');
const cloudinary   		  =   require('../lib/cloudinary');
const User   		  =   require('../models/User');


module.exports.createUser = async (req, res, next) => {
	try{
		const body = { ...req.body };
		
		const user = new User(body);
		await user.save();
		return res.status(201).json(createResponse(user, 'User Added successfully!', false));
	} catch(err) {
		next(err);
	}
};

module.exports.deleteUser = async (req, res, next) => {
	try{
		const { id } = req.params;
		const user =  await User.deleteOne({_id: id});
		if(user.deletedCount) {
			return res.status(200).json(createResponse(null, 'User Deleted successfully!', false));
		}
		return res.status(404).json(createResponse(null, 'No User found with this Id!', true));
	} catch(err) {
		next(err);
	}
};

module.exports.getUserById = async (req, res, next) => {
	try{
		const { id } = req.params;
		const user = await User.findOne({_id: id});
		if(!user) throw new Error('No user found with this id!');
		return res.json(createResponse(user));
	} catch(err){
		next(err);
	}
};

module.exports.updateUser = async (req, res, next) => {
	try{
		const { id } = req.params;
		const user = await User.updateOne({_id: id}, {...req.body});
		if(!user) throw new Error('No user found with this id!');
		return res.json(createResponse(user));
	} catch(err){
		next(err);
	}
};

module.exports.getUsers = async (req, res, next) => {
	try{
		const query = req.query;
		const users = await User.find(query);
		return res.json(createResponse(users));
	} catch(err){
		next(err);
	}
};

