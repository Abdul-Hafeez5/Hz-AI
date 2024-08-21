import Chat from "../models/chat.js";
import UserChats from "../models/userChat.js";

export const createChat = async (req, res) => {
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
};

export const getChatById = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(201).send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching  chat");
  }
};

export const updateChat = async (req, res) => {
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
};

export const deleteChat = async (req, res) => {
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
};
