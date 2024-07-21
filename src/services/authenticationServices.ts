import {PrismaClient} from "@prisma/client";

import {createToken} from "../middleware/authenticationMiddlewares";
import bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET

if (!secret) throw new Error("Missing secret key");

interface UserPayload {
    email: string,
    password: string,
    username: string,
}

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        if (!user) return 'No user found...'
        return createToken(user.id);
    } catch (error: any) {
        if (error.code === "P2002") {
            const target = error.meta?.target;
            if (target && target.includes("username")) {
                throw new Error("Username already in use");
            } else if (target && target.includes("email")) {
                throw new Error("Email already in use");
            } else {
                throw new Error("Unique constraint violation");
            }
        } else {
            throw new Error(error);
        }
    }
};

export const loginUser = async (identifier: string, password: string) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {username: identifier},
                    {email: identifier}
                ]
            }
        })
        if (!existingUser) {
            return {error: "Invalid username or email."};
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return {error: "Invalid password."};
        }

        const token = createToken(existingUser.id);
        return {token};
    } catch (error: any) {
        console.error("Error during login:", error);
        return {error: "An unexpected error occurred during login."};
    }
}