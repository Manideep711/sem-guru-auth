const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only if signed up with email/password
  googleId: { type: String }, // for Google sign-in
  college: { type: String },
  branch: { type: String },
  year: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
