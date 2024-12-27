import express from "express"
import { login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controllers.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout",logout)

router.put("/update", ProtectRoute, updateProfile)

router.get("/check", ProtectRoute , checkAuth)

export default router;