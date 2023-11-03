import express from "express";
import { AuthRoutes } from "./auth.routes.js";
import { UserRotues } from "./user.routes.js";
import { DoctorRotues } from "./doctor.routes.js";
const router = express.Router();

const routes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: UserRotues },
  { path: "/doctors", route: DoctorRotues },
];

routes.map((route) => router.use(route.path, route.route));

export const ApplicationRoutes = router;
