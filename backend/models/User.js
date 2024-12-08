const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "user email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "user password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message:
    "Another user with the same {PATH} already exists. Please try with another one",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
