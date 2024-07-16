import express, { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Routes imports
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.use("/api/v1", userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

export default app;