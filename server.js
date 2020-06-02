// server.js
const express = require("express");
const auth = require("./auth");
const app = express();

app.get("/", (req, res) => {
  return res.send("Hello world");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
