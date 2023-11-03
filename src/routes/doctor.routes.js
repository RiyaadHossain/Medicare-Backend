import express from "express";
import { DoctorControllers } from "../controllers/doctor.controllers.js";
import auth from "../middlewares/auth.js";
import { ENUM_USER_ROLE } from "../enums/userRole.js";
const router = express.Router();

router.get("/", DoctorControllers.getAllDoctors);

router.get("/:id", DoctorControllers.getSingleDoctor);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  DoctorControllers.updateDoctor
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  DoctorControllers.deleteDoctor
);

export const DoctorRotues = router;
