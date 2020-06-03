var express = require("express");
const lifetimeRouter = express.Router();
const redisClient = require("../redis-client");
const API = require("call-of-duty-api")({
  platform: "battle",
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
});
const auth = require("../auth");

const allStatsMiddleWare = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data.lifetime.mode["br_all"]);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

const statsMiddleWare = async (req, res, next) => {
  const { user } = req.query;
  const { type } = req.params;
  console.log(type);
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data.lifetime.mode[type].properties);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

const allItemDataMiddleWare = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      let data = JSON.parse(stringifiedData);
      res.send(data.lifetime.itemData);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

const itemDataMiddleWare = async (req, res, next) => {
  const { user } = req.query;
  const { type } = req.params;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      let data = JSON.parse(stringifiedData);
      res.send(data.lifetime.itemData[type]);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

lifetimeRouter.get("/", async (req, res) => {
  const { user } = req.query;
  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data.lifetime);
  } catch (e) {
    console.log(e);
  }
});

lifetimeRouter.get("/stats", allStatsMiddleWare, async (req, res) => {
  const { user } = req.query;
  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data.lifetime.mode["br_all"].properties);
  } catch (e) {
    console.log(e);
  }
});

lifetimeRouter.get("/stats/:type", statsMiddleWare, async (req, res) => {
  const { user } = req.query;
  const { type } = req.query;
  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data.lifetime.mode[type].properties);
  } catch (e) {
    console.log(e);
  }
});

lifetimeRouter.get("/weapons", allItemDataMiddleWare, async (req, res) => {
  const { user } = req.query;

  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data.lifetime.itemData);
  } catch (e) {
    console.log(e);
  }
});

lifetimeRouter.get("/weapons/:type", itemDataMiddleWare, async (req, res) => {
  const { user } = req.query;
  const { type } = requ.params;

  try {
    await API.login(auth.username, auth.password);
    let data = await API.MWwz(user);
    await redisClient.setAsync(user, 3600, JSON.stringify(data));
    res.send(data.lifetime.itemData[type]);
  } catch (e) {
    console.log(e);
  }
});

module.exports = lifetimeRouter;
