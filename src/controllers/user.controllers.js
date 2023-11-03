import httpStatus from "http-status";
import { catchAsync } from "../shared/catchAsync.js";
import { UserServices } from "../services/user.services.js";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Users data fetched Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User data fetched Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const result = await UserServices.updateUser(id, userData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User data updated Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.deleteUser(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User data deleted Successfully",
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
