import express from "express";
import cors from "cors";
import { connectToDb } from "./configs/db.js";
import chatRouter from "./routes/chatRoutes.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageToutes.js";

const port = process.env.port || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/chats", chatRouter);
app.use("/api/userchats", userRouter);
app.use("/", imageRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connectToDb();
  console.log("server is running on port " + port);
});
