// import express, body-parser, and cors
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./db.config");

// force https
const forceSSL = (req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  return next();
};

// whitelist of domains that can access the API
const whitelist = [
  "http://localhost:3000",
  "https://jokesapp3039.herokuapp.com",
  "http://jokesapp3039.herokuapp.com",
];

// cors options to allow cross origin requests
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// connect to mongodb using connection
connection.once("open", () => {
  console.info("MongoDB connected successfully");
});

connection.on("error", (err) => {
  console.error("error", "MongoDB connection error: " + err);
});

// create an express application
const app = express();

// use body parser with our application
app.use(bodyParser.json());

// use cors to allow cross origin resource sharing
app.use(cors(corsOptions));

// use forceSSL to force https
app.use(forceSSL);

// server react app
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// register routes
app.use("/api", require("./routes/joke.routes"));
app.use("/api", require("./routes/user.routes"));

// serve 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({ message: `${req.url} Not Found` });
});

// set our port
const port = process.env.PORT || 5000;

// listen on port
app.listen(port, () => console.log(`Listening on port ${port}`));
