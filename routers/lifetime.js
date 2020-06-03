var express = require("express");
const lifetimeRouter = express.Router();
const redisClient = require("../redis-client");
const API = require("call-of-duty-api")({
  platform: "battle",
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
});
const auth = require("../auth");

const statsMiddleware = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    console.log(stringifiedData);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data.lifetime);
    } else {
      console.log("next");
      next();
    }
  } catch (e) {
    console.log(e);
  }
};
lifetimeRouter.use("/", statsMiddleware);
lifetimeRouter.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = lifetimeRouter;
