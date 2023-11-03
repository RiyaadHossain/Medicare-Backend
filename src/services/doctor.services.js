import DoctorSchema from "../models/DoctorSchema.js";

const getAllDoctors = async () => {
  const data = await DoctorSchema.find({});

  return data;
};

const getSingleDoctor = async (id) => {
  const data = await DoctorSchema.findById(id);

  return data;
};

const updateDoctor = async (id, payload) => {
  const data = await DoctorSchema.findByIdAndUpdate(id, payload, { new: true });

  return data;
};

const deleteDoctor = async (id) => {
  const data = await DoctorSchema.findByIdAndDelete(id);

  return data;
};

export const DoctorServices = {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
