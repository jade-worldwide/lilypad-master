const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({

  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  propertySize: {
    type: Number,
    required: true
  },
  propertyType: {
    type: String,
    require: true
  },
  numOfBeds: {
    type: Number,
    required: true
  },
  numOfBaths: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pets: {
    type: String
  },
  parking: {
    type: String
  },
  laundry: {
    type: String
  },
  heating: {
    type: String
  },
  cooling: {
    type: String
  },
  description: {
    type: String,
    require: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  photos: [{
    type: String
  }],
  date: {
    type: Date,
    default: Date.now
  },
  application: [{
		type: Schema.Types.ObjectId,
		ref: "Application"
	}]
});


const Property = mongoose.model("Property", PropertySchema);


module.exports = Property;