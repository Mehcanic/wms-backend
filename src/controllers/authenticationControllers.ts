import {Request, Response} from 'express';
import {registerUser, loginUser} from '../services/authenticationServices'

export const handleRegisterUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const token = await registerUser(username, email, password);
        res.status(201).json({ token });
    } catch (error: any) {
        if (error.code === "P2002") {
            const target = error.meta?.target;
            if (target && target.includes("username")) {
                res.status(400).json({ error: "Username already in use" });
            } else if (target && target.includes("email")) {
                res.status(400).json({ error: "Email already in use" });
            } else {
                res.status(400).json({ error: "Unique constraint violation" });
            }
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};


export const handleLoginUser = async (req: Request, res: Response) => {
    const {identifier, password} = req.body;
    try {
        const user = await loginUser(identifier, password);
        res.json({ user });
    } catch (error: any) {
        if (error.code === "P2002") {
            if (error.meta?.target?.includes("username")) {
                return res
                    .status(400)
                    .json({ error: "Username already in use" });
            } else if (error.meta?.target?.includes("email")) {
                return res.status(400).json({ error: "Email already in use" });
            } else {
                return res
                    .status(400)
                    .json({ error: "Unique constraint violation" });
            }
        } else {
            console.error("Internal server error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}