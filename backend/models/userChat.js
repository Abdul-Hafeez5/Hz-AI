import mongoose from "mongoose";
// import { Schema, model, models } from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.userchats ||
  mongoose.model("userchats", userChatsSchema);
