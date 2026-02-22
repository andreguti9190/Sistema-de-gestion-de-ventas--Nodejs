import { Router } from "express"
import getUsers from "../controller/users/getUsers.js";
import getUser from "../controller/users/getUser.js";
import createUser from "../controller/users/createUser.js";
import updateUser from "../controller/users/updateUser.js";
import deleteUser from "../controller/users/deleteUser.js";
const routes = Router();

routes.route("/users")
    .get(getUsers)
    .post(createUser)

routes.route("/users/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)


export default routes;