import express from "express";
import { ProfileControllers } from "../controllers/profile.controllers.js";
import auth from "../middlewares/auth.js";
import { ENUM_USER_ROLE } from "../enums/userRole.js";

const router = express.Router();

router.get(
  "/me",
  auth(ENUM_USER_ROLE.PATIENT, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.ADMIN),
  ProfileControllers.getProfile
);
router.get(
  "/appointments/my-bookings",
  auth(ENUM_USER_ROLE.PATIENT),
  ProfileControllers.getMyBookings
);
router.patch(
  "/update",
  auth(ENUM_USER_ROLE.PATIENT, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.ADMIN),
  ProfileControllers.updateMyProfile
);

export const ProfileRoutes = router;
