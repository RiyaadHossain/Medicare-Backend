import httpStatus from "http-status";
import { catchAsync } from "../shared/catchAsync.js";
import { ReviewServices } from "../services/review.services.js";

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  if (!req.body.user) req.body.user = req.user.userId;

  const result = await ReviewServices.createReview(reviewData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review data created Successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const result = await ReviewServices.getAllReviews(reviewData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Reviews data fetched Successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const result = await ReviewServices.updateReview(reviewData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review data updated Successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const result = await ReviewServices.deleteReview(reviewData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Review data deleted Successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
