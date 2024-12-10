var jwt = require("jsonwebtoken");
const config = require("../../config");

function authService(req, res) {
  if (!config.authenticateState) {
    // next();
    return;
  }

  var cookieString = req.headers.cookie;
  var cookieParts = cookieString.split("; ");

  // Variable to hold the jobpool token
  var token = null;
  // Iterate through each part to find the one containing the jobpool-token
  cookieParts.forEach(function (part) {
    var keyValue = part.split("=");
    var key = keyValue[0];
    var value = keyValue[1];

    if (key === "jobpool-token") {
      token = value;
    }
  });

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secretKey, function (err, decoded) {
    if (err)
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes

    req.UserID = decoded.Id;
    return req;
    // next();
  });
}

module.exports = authService;
