import express from "express";
import {
  createChat,
  deleteChat,
  getChatById,
  updateChat,
} from "../controllers/chatController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const chatRouter = express.Router();
chatRouter.post("/", ClerkExpressRequireAuth(), createChat);
chatRouter.put("/:id", ClerkExpressRequireAuth(), updateChat);
chatRouter.get("/:id", ClerkExpressRequireAuth(), getChatById);
chatRouter.delete("/:id", ClerkExpressRequireAuth(), deleteChat);

export default chatRouter;
