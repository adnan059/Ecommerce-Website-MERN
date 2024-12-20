const Address = require("../../models/Address");
const createError = require("../../utils/createError");

// create new address
const addAddress = async (req, res, next) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return next(createError(400, "invalid data provided"));
    }

    const newAddress = await Address.create({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

// fetch all addresses
const fetchAllAddress = async (req, res, next) => {
  try {
    const addressList = await Address.find({ userId: req.params.userId });

    res.status(200).json(addressList);
  } catch (error) {
    next(error);
  }
};

// update an address
const updateAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return next(createError(400, "User and address id is required!"));
    }
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      req.body,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    next(error);
  }
};

// delete an address
const deleteAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return next(createError(400, "User and address id is required!"));
    }

    await Address.findOneAndDelete({ _id: addressId, userId });

    res.status(200).json({
      success: true,
      message: "address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAddress,
  fetchAllAddress,
  updateAddress,
  deleteAddress,
};
