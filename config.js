const dotenv = require("dotenv");
const path = require("path");

let env = process.env.NODE_ENV ? process.env.NODE_ENV : "";
dotenv.config({
  path: path.resolve(__dirname, `.env${env}`),
});
if (!process.env.backEndPort) {
  throw new Error("Invalid environment");
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "",

  backEndPort: process.env.backEndPort,
  dbURL: process.env.dbURL,
  authenticateState: process.env.authenticateState,
};
