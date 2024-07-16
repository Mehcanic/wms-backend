import app from "./app";
import http from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing HTTP server");
    await prisma.$disconnect();
    process.exit(0);
});