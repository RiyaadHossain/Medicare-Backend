import express from "express";
import auth from "../middlewares/auth.js";
import { ENUM_USER_ROLE } from "../enums/userRole.js";
import { ReviewControllers } from "../controllers/review.controllers.js";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.PATIENT), ReviewControllers.createReview);

router.get("/", ReviewControllers.getAllReviews);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.PATIENT),
  ReviewControllers.updateReview
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.PATIENT),
  ReviewControllers.deleteReview
);

export const ReviewRotues = router;
