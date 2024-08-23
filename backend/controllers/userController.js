import UserChats from "../models/userChat.js";
import User from "../models/userSchema.js";
import crypto from "crypto";

export const userChats = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChat = await UserChats.findOne({ userId });
    if (!userChat || !userChat.chats || userChat.chats.length === 0) {
      return res.status(200).send([]);
    }

    res.status(201).send(userChat.chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching user chats");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not find");

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.name() + 3600000; // reset after 1 hour
    await user.save();

    // to send reset email to user
    // const resetUrl = `http://your-frontend-url/reset-password/${resetToken}`;
    // sendEmail(user.email, resetUrl)

    res.send("Password email token send to email");
  } catch (error) {
    res.status(500).send("Error in Password reset");
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send("Invalid or expired token");
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Password updated successfully");
  } catch (error) {
    res.status(500).send("Error resetting password");
  }
};
