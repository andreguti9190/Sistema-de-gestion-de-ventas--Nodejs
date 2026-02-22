import { Router } from "express";
const routes = Router();

import getCategories from "../controller/categories/getCategories.js";
import createCategorie from "../controller/categories/createCategorie.js"

import getCategorie from "../controller/categories/getCategorie.js";
import deleteCategorie from "../controller/categories/deleteCategorie.js"



routes.route("/categories")
    .get(getCategories)
    .post(createCategorie)

routes.route("/categories/:id")
    .get(getCategorie)
    .delete(deleteCategorie)

export default routes;