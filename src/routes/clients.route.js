import { Router } from "express"
import getClients from "../controller/clients/getClients.js";
import getClient from "../controller/clients/getClient.js";
import createClient from "../controller/clients/createClient.js";
import updateClient from "../controller/clients/updateClient.js";
import deleteClient from "../controller/clients/deleteClient.js";
const routes = Router();

routes.route("/clients")
    .get(getClients)
    .post(createClient)

routes.route("/clients/:id")
    .get(getClient)
    .patch(updateClient)
    .delete(deleteClient)


export default routes;