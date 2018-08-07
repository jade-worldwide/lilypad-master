const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ApplicationSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },  
  lastName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  referenceName1: {
    type: String,
    required: true
  },
  referencePhoneNumber1: {
    type: String,
    required: true
  },
  referenceName2: {
    type: String,
    required: true
  },
  referencePhoneNumber2: {
    type: String,
    required: true
  },
  currentEmployment: {
    type: String,
    required: true
  },
  employmentPhoneNumber: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  pets: {
    type: String,
  },
  socialNumber: {
    type: Number,
    required: true
  },
  driverNumber: {
    type: String,
    required: true
  },
  additionalNotes: {
    type: String
  }
});


let Application = mongoose.model("Application", ApplicationSchema);


module.exports = Application;