import DoctorSchema from "../models/DoctorSchema.js";
import ReviewSchema from "../models/ReviewSchema.js";

const createReview = async (payload) => {
    
  const data = await ReviewSchema.create(payload);
  await DoctorSchema.findByIdAndUpdate(payload.doctor, {
    $push: { reviews: data._id },
  });
    
  return data;
};

const getAllReviews = async () => {
  const data = await ReviewSchema.find({});
  return data;
};

const updateReview = async (id, payload) => {
  const data = await ReviewSchema.findByIdAndUpdate(id, payload, { new: true });
  return data;
};

const deleteReview = async (id) => {
  const data = await ReviewSchema.findByIdAndDelete(id);
  return data;
};

export const ReviewServices = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
