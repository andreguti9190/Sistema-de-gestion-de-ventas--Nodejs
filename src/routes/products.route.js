import { Router } from "express";
const routes = Router()

import getProducts from "../controller/products/getProducts.js"
import getProduct from "../controller/products/getProduct.js";
import createProduct from "../controller/products/createProduct.js"
import updateProduct from "../controller/products/updateProduct.js";
import deleteProduct from "../controller/products/deleteProduct.js"
import logged from "../middleware/logged.js"

routes.route("/products")
    .get(getProducts)
    .post(logged, createProduct)

routes.route("/products/:id")
    .get(getProduct)
    .patch(logged, updateProduct)
    .delete(logged, deleteProduct)


export default routes;