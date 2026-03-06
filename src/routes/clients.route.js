import { Router } from "express"
import getClients from "../controller/clients/getClients.js";
import getClient from "../controller/clients/getClient.js";
import createClient from "../controller/clients/createClient.js";
import updateClient from "../controller/clients/updateClient.js";
import deleteClient from "../controller/clients/deleteClient.js";
import logged from "../middleware/logged.js"
const routes = Router();

routes.route("/clients")
    .get(logged, getClients)
    .post(logged, createClient)

routes.route("/clients/:id")
    .get(logged, getClient)
    .patch(logged, updateClient)
    .delete(logged, deleteClient)


export default routes;