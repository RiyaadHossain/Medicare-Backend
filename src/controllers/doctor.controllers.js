import httpStatus from "http-status";
import { catchAsync } from "../shared/catchAsync.js";
import { DoctorServices } from "../services/doctor.services.js";

const getAllDoctors = catchAsync(async (req, res) => {
  const result = await DoctorServices.getAllDoctors();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Doctors data fetched Successfully",
    data: result,
  });
});

const getSingleDoctor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DoctorServices.getSingleDoctor(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Doctor data fetched Successfully",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const doctorData = req.body;
  const result = await DoctorServices.updateDoctor(id, doctorData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Doctor data updated Successfully",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DoctorServices.deleteDoctor(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Doctor data deleted Successfully",
    data: result,
  });
});

export const DoctorControllers = {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
