require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");

// routes import
const root = require("./routes/root");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

console.log(process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();
// middlewares
app.use(cookieParser());
app.use(logger);

// app.use(
//   cors({ origin: "https://typenotes-red.vercel.app", credentials: true })
// );
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static files
app.use("/", express.static(path.join(__dirname, "./client/dist")));

// routes
app.use("/", root);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

app.all("*", (req, res) => {
  res.status(404);
  console.log(__dirname);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  }
});

// error handler
app.use(errorHandler);

// listener
mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(err, "mongoError.log");
});
