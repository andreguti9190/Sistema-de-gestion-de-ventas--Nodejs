import { Router } from "express";
const routes = Router();

import user from "./users.route.js"
import categories from "./categories.route.js"

routes.use(user);
routes.use(categories)

export default routes;
