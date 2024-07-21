import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

interface CustomJwtPayload extends JwtPayload {
    userId: number;
}

interface CustomRequest extends Request {
    user?: { id: number };
}

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET must be defined in the .env");
}

export const createToken = (userId: number) => {
    return jwt.sign({ userId }, secret, { expiresIn: "12h" });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret) as CustomJwtPayload;
    } catch (error: any) {
        throw new Error("Invalid token pprovided in verify token");
    }
};

export const authenticateToken = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    try {
        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error: any) {
        next(error.message);
        return res.status(401).json({ error: "Unauthorized" });
    }
};
