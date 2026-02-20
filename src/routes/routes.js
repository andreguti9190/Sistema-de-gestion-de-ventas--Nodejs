import { Router } from "express";
const routes = Router();

import user from "./user.route.js"

routes.use(user);

export default routes;
