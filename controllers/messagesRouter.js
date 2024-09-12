import express from "express";
import path from "path";
import url from "url";
import messages from "../models/messages.js";

const messagesRouter = express.Router();

// Assets path need to be relative to router
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "../public");
messagesRouter.use(express.static(assetsPath));

// Routes
messagesRouter.get("/:messageId", (req, res) => {
  try {
    const message = messages.find(
      (message) => message.id == req.params.messageId
    );
    if (message) {
      res.render("messages/message", {
        message: message,
        showOpenMessage: false,
      });
    } else {
      throw new Error("Message not found");
    }
  } catch (error) {
    res.send("Message was not found");
  }
  return;
});

export default messagesRouter;
