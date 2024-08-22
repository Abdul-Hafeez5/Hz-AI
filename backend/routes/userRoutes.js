import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { userChats } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", ClerkExpressRequireAuth(), userChats);

export default userRouter