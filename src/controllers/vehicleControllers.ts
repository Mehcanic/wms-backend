import {Request, Response} from 'express'

import {getAllUsers} from "../services/userServices";

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({message: `Something went wrong in handleGetAllUsers in userControllers: ${error.message}`});
    }
}