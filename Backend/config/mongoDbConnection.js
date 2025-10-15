import mongoose from "mongoose";
import "dotenv/config";

const MongoDb_Url = process.env.MONGO_DB_URL;

if (!MongoDb_Url) {
    throw new Error ('ENV file not loaded')
}

const mongoDbConnection = async () => {
  try {
    await mongoose.connect(MongoDb_Url);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: `error occur in the mongoDbConnection file => ${error.message}`,
    };
  }
};

export default mongoDbConnection;
