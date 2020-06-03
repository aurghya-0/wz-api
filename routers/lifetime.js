const express = require("express");
const lifetimeRouter = express.Router();
const redisClient = require("../redis-client");
const loginHelper = require("../helpers/login");

const statsMiddleware = async (req, res, next) => {
  const { user } = req.query;
  const { type } = req.params;
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

const weaponsMiddleware = async (req, res, next) => {
  const { user } = req.query;
  try {
    let stringifiedData = await redisClient.getAsync(user);
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData);
      res.send(data.lifetime["itemData"]);
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

lifetimeRouter.use("/stats/:type", statsMiddleware);
lifetimeRouter.use("/weapons", weaponsMiddleware);

lifetimeRouter.get("/stats/:type", async (req, res) => {
  const { user } = req.query;
  const { type } = req.params;
  try {
    const data = await loginHelper(user);
    if (data["lifetime"]) {
      res.send(data.lifetime.mode[type].properties);
    } else {
      res.send(data);
    }
  } catch (e) {
    res.send(e);
  }
});

lifetimeRouter.get("/weapons", async (req, res) => {
  const { user, type } = req.query;
  try {
    const data = await loginHelper(user);
    if (data["lifetime"]) {
      res.send(data.lifetime["itemData"]);
    } else {
      res.send(data);
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = lifetimeRouter;
