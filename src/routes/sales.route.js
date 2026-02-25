import { Router } from "express";
const routes = Router();

import createSales from "../controller/sales/createSales.js";
import getSales from "../controller/sales/getSales.js";
import getSale from "../controller/sales/getSale.js";
import deleteSales from "../controller/sales/deleteSales.js";
import updateSales from "../controller/sales/updateSales.js";

routes.route("/sales")
    .get(getSales)
    .post(createSales);

routes.route("/sales/:id")
    .get(getSale)
    .patch(updateSales)
    .delete(deleteSales)

export default routes;