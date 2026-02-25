import { Router } from "express";
const routes = Router();

import createSales from "../controller/sales/createSales.js";

routes.route("/sales")
    .post(createSales);


export default routes;