import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth) // making this function to check if user is logged in or not

export default router;
