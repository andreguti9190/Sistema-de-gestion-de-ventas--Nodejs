import { Router } from "express";
const routes = Router();

import clients from "./clients.route.js"
import categories from "./categories.route.js"
import products from "./products.route.js"
import sales from "./sales.route.js"
import auth from "./auth.route.js"

routes.use(auth)
routes.use(sales)
routes.use(products)
routes.use(clients);
routes.use(categories)

export default routes;
