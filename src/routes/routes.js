import { Router } from "express";
const routes = Router();

import user from "./users.route.js"
import categories from "./categories.route.js"
import products from "./products.route.js"
import sales from "./sales.route.js"

routes.use(sales)
routes.use(products)
routes.use(user);
routes.use(categories)

export default routes;
