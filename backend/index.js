import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import { connectToDb } from "./configs/db.js";
import UserChats from "./models/userChat.js";
import Chat from "./models/chat.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.port || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const { text } = req.body;
  const userId = req.auth.userId;

  try {
    // create a new chat
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // check whether user chat exists

    const userChat = await UserChats.find({ userId: userId });
    if (!userChat.length) {
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChats.save();
    } else {
      // If chats exists, push to existing array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat");
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChat = await UserChats.find({ userId });
    res.status(201).send(userChat[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching user chats");
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(201).send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching  chat");
  }
});

app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).send("error adding conversation");
  }
});

app.delete("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const chatId = req.params.id;
  try {
    const deleteChat = await Chat.findByIdAndDelete(chatId);
    if (deleteChat) {
      return res.status(404).json({ message: "chat not found" });
    }
    res.status(200).json({ message: "Chat deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: " server error", error });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connectToDb();
  console.log("server is running on port " + port);
});
