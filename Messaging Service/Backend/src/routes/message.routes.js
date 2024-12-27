import express from "express";
import Message from "../models/message.models.js"; // Adjust the path as necessary
import { ProtectRoute } from "../middleware/auth.middleware.js";// Middleware for authentication
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

// Get All Messages Between Two Users
router.get("/users", ProtectRoute, getUsersForSidebar);
router.get("/:id",ProtectRoute, getMessages)

router.post("/send/:id", ProtectRoute, sendMessage)

export default router;
