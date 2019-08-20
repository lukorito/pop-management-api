import express from "express";

import { signup, login } from "../controllers/auth.controller";
import checkToken from "../middlewares/authMiddleware";


const router = express.Router();

// auth
router.post("/register", signup);
router.post("/login", login);

// location


export default router;
