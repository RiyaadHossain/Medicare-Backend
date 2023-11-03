import config from "../config/index.js";
import APIError from "../errors/APIError.js";

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (error, _req, res, _next) => {
  console.log({ error });
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorMessages = [];

  if (error instanceof APIError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
