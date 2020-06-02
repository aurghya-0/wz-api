var express = require("express");
var lifetimeRouter = express.Router();
const redisClient = require("../redis-client");
const auth = require("../auth");
const API = require("call-of-duty-api")({
  platform: "battle",
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
});

const lifetimeMiddleware = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data["lifetime"]);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

lifetimeRouter.use(lifetimeMiddleware);

lifetimeRouter.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    await API.login(auth.username, auth.password);
    const data = await API.MWwz(user);
    if (data) {
      await redisClient.setAsync(user, 3600, JSON.stringify(data));
      res.send(data["lifetime"]);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = lifetimeRouter;
