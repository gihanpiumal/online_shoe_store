// databaseConnection.js
import mongoose from "mongoose";
import config from "../../config.js"; // Adjust the path as necessary
import authService from "./AuthService.js";

export const connectWithRetry = async () => {
  if (mongoose.connection.readyState === 1) {
    console.info("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(config.dbURL, {
      directConnection: true,
      retryWrites: true,
    });
    console.info("Connection to the database was successful.");
  } catch (error) {
    console.error("Database connection error:", error);
    setTimeout(connectWithRetry, 5000); // Try to reconnect every 5 seconds
  }
};

// Middleware for use in API routes to ensure DB connection
export const databaseMiddleware =
  (handler, authenticate) => async (req, res) => {
    await connectWithRetry(); // Ensure DB is connected before handling the request
    // if (authenticate) {
    //   authService(req, res);
    // }
    return handler(req, res);
  };

// Method to start a session
export const startSession = () => mongoose.startSession();

export default databaseMiddleware;
