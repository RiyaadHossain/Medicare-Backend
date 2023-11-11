import httpStatus from "http-status";
import { catchAsync } from "../shared/catchAsync.js";
import { ProfileServices } from "../services/profile.services.js";

const getProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ProfileServices.getProfile(user);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Profile data retrived Successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await ProfileServices.getMyBookings(userId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Bookings data retrived Successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const userJwt = req.user;
  const userData = req.body;
  const result = await ProfileServices.updateMyProfile(userJwt, userData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User data updated Successfully",
    data: result,
  });
});

export const ProfileControllers = {
  getProfile,
  getMyBookings,
  updateMyProfile,
};
