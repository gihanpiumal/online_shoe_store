// pages/api/add_rule.js
import asyncMiddleware from "../../src/service/AsyncMiddleware";
import databaseMiddleware from "../../src/service/databaseConnection";
import ApiResponse from "../../src/service/ResponseHelper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    return res.status(200).send(ApiResponse.getSuccess("Skill created"));
  } else {
    res.status(405).send({ message: "Only POST requests are allowed" });
  }
};

export default databaseMiddleware(asyncMiddleware(handler));
