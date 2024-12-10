import mongoose from "mongoose";
import config from "../../config";

// Ensure mongoose connection
const clientPromise = mongoose
  .connect(config.dbURL, {
    directConnection: true,
    retryWrites: true,
  })
  .then((mongoose) => {
    // Use mongoose.connection.getClient() to get the native MongoDB client
    return mongoose.connection.getClient();
  });

export default clientPromise;
