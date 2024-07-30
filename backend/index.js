import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import userChats from "./models/userChat"

const port = process.env.port || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected");
  } catch (error) {
    console.log(error);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});
app.post("/api/chats", async (req, res) => {
  const { text, userId } = req.body;

  try {
    // create a new chat
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // check whether cuser chat exists

    const userChat = await userChats.find({ userId: userId });
    if(!userChats.length){
      const newUserChats = new UserChats()
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat");
  }
});

app.listen(port, () => {
  connectToDb();
  console.log("server is running on port " + port);
});
