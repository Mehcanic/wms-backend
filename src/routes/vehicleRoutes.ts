import {Router} from "express";

const router = Router()

import {handleGetAllUsers} from "../controllers/userControllers";

// TODO Endpoints for the {type of model}
// TODO Get all {type of model} - but limit to 200
// TODO Get {type of model} by advanced search query (search by firstname, lastname, email, phone, address - by street, city, etc)
// TODO Create new {type of model}
// TODO Edit {type of model}
// TODO Delete {type of model} - what i mean is it should be deleted if user doesn't have work orders; if user has even one it should be softDeleted / archived so it will never be brought by any search in the front end and cannot be edited in any matter. This is crucial for management and financial apps
// TODO filter to get all {type of model} with specified amount of how much to display = fetch (10, 25, 50 or Custom)
// TODO Make documentation for swagger about each route
router.get("/users", handleGetAllUsers);

export default router