const mongoose = require("mongoose");


let Schema = mongoose.Schema;

let RenterSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  },

  application: [{
    type: Schema.Types.ObjectId,
    ref: "Application"
  }]
});

// This creates our model from the above schema, using mongoose's model method
let Renter = mongoose.model("Renter", RenterSchema);

// Export the Article model
module.exports = Renter;
