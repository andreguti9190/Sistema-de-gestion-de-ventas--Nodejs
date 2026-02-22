import { Router } from "express";
const routes = Router()

import getProducts from "../controller/products/getProducts.js"
import getProduct from "../controller/products/getProduct.js";
import createProduct from "../controller/products/createProduct.js"
import updateProduct from "../controller/products/updateProduct.js";
import deleteProduct from "../controller/products/deleteProduct.js"

routes.route("/products")
    .get(getProducts)
    .post(createProduct)

routes.route("/products/:id")
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct)


export default routes;