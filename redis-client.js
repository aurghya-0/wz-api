const redis = require("redis");
const { promisify } = require("util");

const REDIS_URL = process.env.REDIS_URL || 6379;

const client = redis.createClient(REDIS_URL);

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.setex).bind(client),
  keysAsync: promisify(client.keys).bind(client),
};
