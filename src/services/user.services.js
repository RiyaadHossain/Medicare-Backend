import UserSchema from "../models/UserSchema.js";

const getAllUsers = async () => {
  const data = await UserSchema.find({});

  return data;
};

const getSingleUser = async (id) => {
  const data = await UserSchema.findById(id);

  return data;
};

const updateUser = async (id, payload) => {
  const data = await UserSchema.findByIdAndUpdate(id, payload, { new: true });

  return data;
};

const deleteUser = async (id) => {
  const data = await UserSchema.findByIdAndDelete(id);

  return data;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
