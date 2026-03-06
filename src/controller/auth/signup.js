import { validateUser } from "../validation/auth.validation.js"
import config from "../../config.js"
import bcrypt from "bcrypt"
import { signup } from "../../model/auth.model.js"
import crypto from "node:crypto"
import jwt from "jsonwebtoken"

const isEmpty = (body) => !body || Object.keys(body).length == 0


const signupController = async (req, res) => {
    try {
        if (isEmpty(req.body)) throw new Error("request body is empty")

        let uuid = crypto.randomUUID();
        let { username, email, password } = req.body
        const validUser = await validateUser({ username, email, password })

        if (!validUser) throw new Error("data is invalid")
        password = await bcrypt.hash(password, config.SALT_HASH)

        const algo = await signup(uuid, username, email, password);

        const token = jwt.sign({ id: uuid, username: username }, config.SECRET_JWT, {
            expiresIn: "1h"
        })
        return res.cookie("AccessToken",token,{
            maxAge:60*60*24*1000,
            httpOnly:true
        }).status(200).json({ error: false, msg: "User has been created sucessfully" })
    } catch (err) {
        res.status(400).json({ error: true, msg: err.message })
    }
}

export default signupController;