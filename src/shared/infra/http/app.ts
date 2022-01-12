import "reflect-metadata";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import "dotenv/config";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import upload from "@config/upload";
import cors from "cors";
import rateLimiter from "./middlewares/rateLimiter";

createConnection();

const app = express();
app.use(rateLimiter);
app.use(json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar",express.static(`${upload.tmpFolder}/avatar`));

app.use("/cars",express.static(`${upload.tmpFolder}/cars`));
app.use(cors({}));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "Error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
