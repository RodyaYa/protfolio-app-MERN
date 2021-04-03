const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../config/configs");

module.exports = (isRememberMeTurnedOn) => {
  const refreshTokenLifetime = isRememberMeTurnedOn ? "300d" : "30d";
  const accessTokenLifetime = isRememberMeTurnedOn ? "27d" : "1h";

  const access_token = jwt.sign({}, JWT_SECRET, {
    expiresIn: accessTokenLifetime,
  });
  const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {
    expiresIn: refreshTokenLifetime,
  });

  return {
    access_token,
    refresh_token,
  };
};
