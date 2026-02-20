import { Router } from "express"
const routes = Router();

routes.route("/users")
    .get((req,res)=>{
        res.send("get user")
    })
    .post((req,res) => {
        res.send("create user")
    })
    .put((req,res) => {
        res.send("update user")
    })
    .delete((req,res) => {
        res.send("delete user")
    })

export default routes;