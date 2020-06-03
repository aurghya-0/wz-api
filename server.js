// server.js
var express = require("express");
var app = express();
const lifeTimeRouter = require("./routers/lifetime");
const weeklyRouter = require("./routers/weekly");

app.use("/lifetime", lifeTimeRouter);
app.use("/weekly", weeklyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
