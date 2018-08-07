const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PropertyManagerSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  phoneNumber: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  property: [{
    type: Schema.Types.ObjectId,
    ref: "Property"
  }]
});

let PropertyManager = mongoose.model("PropertyManager", PropertyManagerSchema);

module.exports = PropertyManager;
