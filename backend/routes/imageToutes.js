import express from "express";
import { getImageKitAuthParams } from "../controllers/imageController.js";

const imageRouter = express.Router();

imageRouter.get("/upload", getImageKitAuthParams);
export default imageRouter;
