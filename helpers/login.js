const API = require("call-of-duty-api")({
  platform: "battle",
  ratelimit: { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 },
});
const auth = require("../auth");

module.exports = async (gamertag) => {
  try {
    await API.login(auth.username, auth.password);
    const data = await API.MWwz(gamertag);
    if (data) {
      await redisClient.setAsync(user, 3600, JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.log(error);
    return e;
  }
};
