const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ECHO//NULL archive node online.");
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
