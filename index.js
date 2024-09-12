import url from "url";
import path from "path";
import "dotenv/config";
import express from "express";
import messagesRouter from "./controllers/messagesRouter.js";
import messages from "./models/messages.js";

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// middleware
const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

// Assets path
const assetsPath = path.join(__dirname, "public");

// Middleware
app.use(express.static(assetsPath));
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// View path and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Controllers
app.use("/messages", messagesRouter);

// Routes

//////////////// new ////////////////
app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  console.log(req.body);
  let messageUser = req.body.user;
  let messageText = req.body.message;
  messages.push({
    id: messages.length + 1,
    user: messageUser,
    text: messageText,
    added: new Date(),
  });
  res.redirect("/");
  res.end();
});

//////////////// main ////////////////
app.get("/", (req, res) => {
  res.render("index", { messages: messages, showOpenMessage: true });
});

app.get("*", (req, res) => {
  res.send("Page not found");
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
