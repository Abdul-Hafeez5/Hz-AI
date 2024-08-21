import UserChats from "../models/userChat.js";

export const userChats = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChat = await UserChats.find({ userId });
    res.status(201).send(userChat[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching user chats");
  }
};
