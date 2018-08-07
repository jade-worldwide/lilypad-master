const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertyLikeSchema = new Schema({

  title: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  propertySize: {
    type: Number,
  },
  propertyType: {
    type: String,
  },
  numOfBeds: {
    type: Number,
  },
  numOfBaths: {
    type: Number,
  },
  price: {
    type: Number,
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
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  photos: [{
    type: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
});


const Property = mongoose.model("PropertyLike", PropertyLikeSchema);


module.exports = Property;