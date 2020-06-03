// server.js
var express = require("express");
var app = express();
const lifeTimeRouter = require("./routers/lifetime");

// app.get("/", (req, res) => {
//   console.log(req.query);
//   return res.send("Hello world");
// });

app.use("/lifetime", lifeTimeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
