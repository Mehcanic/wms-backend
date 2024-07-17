import {Router} from "express";

const router = Router()

import {handleGetAllUsers} from "../controllers/userControllers";

router.get("/users", handleGetAllUsers);

export default router