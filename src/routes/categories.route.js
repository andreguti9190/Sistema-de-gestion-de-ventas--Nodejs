import { Router } from "express";
const routes = Router();

import getCategories from "../controller/categories/getCategories.js";
import createCategorie from "../controller/categories/createCategorie.js"
import getCategorie from "../controller/categories/getCategorie.js";
import deleteCategorie from "../controller/categories/deleteCategorie.js"
import logged from "../middleware/logged.js";


routes.route("/categories")
    .get(getCategories)
    .post(logged,createCategorie)

routes.route("/categories/:id")
    .get(getCategorie)
    .delete(logged,deleteCategorie)

export default routes;