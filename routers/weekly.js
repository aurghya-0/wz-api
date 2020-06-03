const express = require("express");
const weekly = express.Router();
const redisClient = require("../redis-client");
const loginHelper = require("../helpers/login");

const weeklyMiddleware = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      // send weekly data
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

weekly.use("/", weeklyMiddleware);
weekly.route("/", async (req, res) => {
  const { user } = req.query;
  try {
    const data = await loginHelper(user);
    // check if weekly data exists and send else send error
  } catch (e) {
    res.send(e);
  }
});
