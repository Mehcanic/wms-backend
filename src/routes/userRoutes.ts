import {Router} from "express";

const router = Router()

import {handleGetAllUsers} from "../controllers/userControllers";

router.get("/", handleGetAllUsers);

export default router