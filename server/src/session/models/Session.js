const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Session = new Schema({
  name:{
    type:String,
    required: true
  },

  doctor:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:"User",
    required: true
  },

  date:{
    type: mongoose.SchemaTypes.Date,
    required: true
  },

  fromTime:{
    type: mongoose.SchemaTypes.Date,
    required: true
  },

  toTime: {
    type: mongoose.SchemaTypes.Date,
    required: true
  },

  maxPatients: {
    type: mongoose.SchemaTypes.Number,
    required: true
  }
});



module.exports = mongoose.model("Session", Session);
