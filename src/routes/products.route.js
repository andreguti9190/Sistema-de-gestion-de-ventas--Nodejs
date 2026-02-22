import { Router } from "express";
const routes = Router()

routes.route("/products")
    .get(getProducts)
    .post(createProduct)

routes.route("/users/:id")
    .get(getProducts)
    .patch(updateProduct)
    .delete(deleteProduct)


export default routes;