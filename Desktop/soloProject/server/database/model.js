/* eslint-disable quotes */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const socialMediaSchema = new Schema(
  {
    facebook: String,
    twitter: String,
  },
  { collection: "associations" }
);

const associationSchema = new Schema(
  {
    id: String,
    name: String,
    theme: String,
    website: String,
    img: String,
    socialMedia: [socialMediaSchema],
    funding: String,
  },
  { collection: "associations" }
);

const userSchema = new Schema({
  id: String,
  firstname: String,
  lastname: String,
  interest: String,
}, {collection: "users"});

const SocialMedia = mongoose.model("socialMedia", socialMediaSchema);
const Association = mongoose.model("association", associationSchema);
const User = mongoose.model("user", userSchema);

module.exports = {SocialMedia, Association, User};

/* module.exports = mongoose.model("socialMedia", socialMediaSchema);
module.exports = mongoose.model("association", associationSchema); */
