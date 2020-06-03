var express = require("express");
const weekly = express.Router();
const redisClient = require("../redis-client");
const API = require("call-of-duty-api")({
  platform: "battle",
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
});
const auth = require("../auth");

const weeklyMiddleware = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data["weekly"]);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

weekly.get("/", weeklyMiddleware, async (req, res) => {
  const { user } = req.query;
  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data["weekly"]);
  } catch (e) {
    res.send(e);
  }
});

module.exports = weekly;
