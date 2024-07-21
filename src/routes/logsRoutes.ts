import {Router} from "express";

const router = Router()

import {handleGetAllUsers} from "../controllers/userControllers";

// DONE get all logs - limit to 50 by default.
// TODO filter to get all logs with specified amount of how much to display = fetch
// TODO Make documentation for swagger about each route

router.get("/users", handleGetAllUsers);

export default router