const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../../utils/createError");
const User = require("../../models/User");

// --------- register controller ---------
const registerCtrl = async (req, res, next) => {
  try {
    if (
      req.body.userName === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return next(createError(401, "all the fields are required"));
    }

    const hashedPswd = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({ ...req.body, password: hashedPswd });

    const { _id, password, isAdmin, ...others } = newUser._doc;

    const token = jwt.sign(
      {
        id: _id,
        isAdmin,
      },
      process.env.JWT_Secret,
      { expiresIn: "1d" }
    );

    res.status(201).json({ _id, token, isAdmin, ...others });
  } catch (error) {
    next(error);
  }
};

// ---------- login controller -----------

const loginCtrl = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(401, "wrong credentials"));
    }

    const isValidPswd = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPswd) {
      return next(createError(401, "wrong credentials"));
    }

    const { _id, password, isAdmin, ...others } = user._doc;

    const token = jwt.sign(
      {
        id: _id,
        isAdmin,
      },
      process.env.JWT_Secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({ _id, token, isAdmin, ...others });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
};
