import express from "express";
import mongoDbConnection from "./config/mongoDbConnection.js";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;
const app = express();

const mongoConnectionString = await mongoDbConnection();
if (mongoConnectionString?.success) {
  app.use(express.json());
  app.use(express.urlencoded({ extends: true }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(router);

  app.get("/", (req, res) =>
  {
    res.send("server is running ");
  });

  app.listen(port, () =>
  {
    console.log(`Server is running on port => ${port}`);
  });
}
else process.exit(1);
// credentials: true,