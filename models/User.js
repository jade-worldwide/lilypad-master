const mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


const Schema = mongoose.Schema;
// User Schema
const UserSchema = new Schema({
	password: {
		type: String
	},
	email: {
		type: String,
	},
	name: {
		type: String
	},
	phonenumber: {
		type: Number
	},
	role: {
		type: String,
		enum: ['Renter', 'Property Manager'],
		default: 'Renter'
	},
	property: [{
		type: Schema.Types.ObjectId,
		ref: "Property"
	}],
	propertylike: [{
		type: Schema.Types.ObjectId,
		ref: "Property"
	}],
	application: [{
		type: Schema.Types.ObjectId,
		ref: "Application"
	}],
	propertylike: [{
		type: Schema.Types.ObjectId,
		ref: "PropertyLike"
	}]
});

const User =  mongoose.model('User', UserSchema);

module.exports = User;

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
			console.log('Encrypted!');
		});
	});
}

module.exports.getUserByUsername = function (username, callback) {
	let query = { email: username };
	User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}

