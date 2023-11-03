import mongoose from "mongoose";
import DoctorSchema from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// To populate user info with every query with 'find' keyword
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

// To Calculate Avg Rating
reviewSchema.statics.calAvgRating = async function (doctorId) {
  const stats = await this.aggregate([
    { $match: { doctor: doctorId } },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  console.log(stats);
  const { avgRating } = stats[0];
  DoctorSchema.findOneAndUpdate(
    { _id: doctorId },
    {
      $set: { averageRating: avgRating },
      $inc: { totalRating: 1 },
    }
  );
};

reviewSchema.post("save", function () {
  this.constructor.calAvgRating(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
