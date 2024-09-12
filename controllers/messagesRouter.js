import express from "express";
import messages from "../models/messages.js";
const messagesRouter = express.Router();

messagesRouter.get("/:messageId", (req, res) => {
  try {
    const message = messages.find(
      (message) => message.id == req.params.messageId
    );
    res.render("messages/singleMessage", { message: message });
  } catch (error) {
    res.send("Message not found");
  }
  return;
});

export default messagesRouter;
