import express from "express";
import { UserControllers } from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";
import { ENUM_USER_ROLE } from "../enums/userRole.js";
const router = express.Router();

router.get("/", UserControllers.getAllUsers);
router.get("/:id", UserControllers.getSingleUser);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), UserControllers.updateUser);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUser);

export const UserRotues = router;
