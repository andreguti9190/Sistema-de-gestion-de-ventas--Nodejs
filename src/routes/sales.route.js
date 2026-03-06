import { Router } from "express";
const routes = Router();

import createSales from "../controller/sales/createSales.js";
import getSales from "../controller/sales/getSales.js";
import getSale from "../controller/sales/getSale.js";
import deleteSales from "../controller/sales/deleteSales.js";
import updateSales from "../controller/sales/updateSales.js";
import logged from "../middleware/logged.js"

routes.route("/sales")
    .get(logged, getSales)
    .post(logged, createSales);

routes.route("/sales/:id")
    .get(logged, getSale)
    .patch(logged, updateSales)
    .delete(logged, deleteSales)

export default routes;