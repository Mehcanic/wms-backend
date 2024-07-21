import express, { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import {swaggerUIHandler, swaggerUIMiddleware} from "./middleware/swagger";

// Routes imports
import customerRoutes from "./routes/customerRoutes";
import logsRoutes from "./routes/logsRoutes";
import userRoutes from "./routes/userRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import workOrderRoutes from "./routes/workOrderRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";

dotenv.config();

const app = express();
app.use('/api-docs', swaggerUIHandler, swaggerUIMiddleware);

const prisma = new PrismaClient();

app.use(express.json());

// Routes

app.use("/api/v1", customerRoutes);
app.use("/api/v1", logsRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", workOrderRoutes);
app.use('/api/v1', authenticationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

export default app;