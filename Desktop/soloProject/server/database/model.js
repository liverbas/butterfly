/* eslint-disable quotes */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const socialMediaSchema = new Schema({
  facebook: String,
  twitter: String,
}, {collection: "associations"});

const associationSchema = new Schema({
  id:String,  
  name: String,
  theme: String,
  website: String,
  img: String,
  socialMedia: [socialMediaSchema],
  funding: String,
}, {collection: "associations"});

module.exports = mongoose.model("socialMedia", socialMediaSchema);
module.exports = mongoose.model("association", associationSchema);
