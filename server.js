const express = require("express");

const app = express();
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/archive", (req, res) => {
  res.json({
    stage: "ARCHIVE",
    message: "The record was not destroyed. It was moved."
  });
});
app.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ARCHIVE_USER &&
    password === process.env.ARCHIVE_PASSWORD
  ) {
    return res.json({
      success: true,
      message: "Archive access granted."
    });
  }

  res.status(401).json({
    success: false,
    message: "Access denied."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ECHO//NULL running on port ${PORT}`);
});
