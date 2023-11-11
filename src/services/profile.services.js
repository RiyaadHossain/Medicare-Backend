import httpStatus from "http-status";
import APIError from "../errors/APIError.js";
import DoctorSchema from "../models/DoctorSchema.js";
import UserSchema from "../models/UserSchema.js";
import BookingSchema from "../models/BookingSchema.js";
import { ENUM_USER_ROLE } from "../enums/userRole.js";

const getProfile = async (userJwt) => {
  const { userId, role } = userJwt;
  let userData, appointments;

  if (role != ENUM_USER_ROLE.DOCTOR)
    userData = await UserSchema.findById(userId).lean();

  if (role == ENUM_USER_ROLE.DOCTOR) {
    userData = await DoctorSchema.findById(userId).lean();
    appointments = await BookingSchema.find({ doctor: userId });
  }

  if (!userData) throw new APIError(httpStatus.BAD_REQUEST, "User not found!");

  // eslint-disable-next-line no-unused-vars
  const { password, ...user } = userData;
  return { user, appointments };
};

const getMyBookings = async (userId) => {
  // 1. Get User specific bookings
  const bookings = await BookingSchema.find({ user: userId }).lean();

  // 2. Extract Doctors' Ids
  const doctorIds = bookings.map((el) => el.doctor);

  // 3. Retrieve Doctor documents
  const doctors = await DoctorSchema.find({ _id: { $in: doctorIds } }).select(
    "-password"
  );

  return { doctors };
};

const updateMyProfile = async (userJwt, userData) => {
  const { userId, role } = userJwt;

  let user = await UserSchema.findById(userId);
  
  if (!user) user = await DoctorSchema.findById(userId);

  if (!user) throw new APIError(httpStatus.BAD_REQUEST, "User not found!");

  if (role === ENUM_USER_ROLE.PATIENT)
    user = await UserSchema.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });

  if (role === ENUM_USER_ROLE.DOCTOR)
    user = await DoctorSchema.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });

  return user;
};

export const ProfileServices = { getProfile, getMyBookings, updateMyProfile };
