import express from "express";

import { signup, login } from "../controllers/auth.controller";
import {
	createLocation,
	getOne,
	getAll,
	deleteLocation,
	updateLocation,
} from "../controllers/location.controller";
import checkToken from "../middlewares/authMiddleware";
import {
	locationNameValidator,
	maleValidator,
	femaleValidator,
} from "../middlewares/validatorMiddleware";

const router = express.Router();

// auth
router.post("/register", signup);
router.post("/login", login);

// location
router.post(
	"/location",
	checkToken,
	locationNameValidator,
	maleValidator,
	femaleValidator,
	createLocation,
);
router.get("/location", checkToken, getAll);
router.get("/location/:id", checkToken, getOne);
router.put(
	"/location/:id",
	checkToken,
	locationNameValidator,
	maleValidator,
	femaleValidator,
	updateLocation,
);
router.delete("/location/:id", checkToken, deleteLocation);

export default router;
