import { validateUser } from "../validation/auth.validation.js"
import { getUser } from "../../model/auth.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../../config.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const login = async (req, res) => {
    try {
        if (isEmpty(req.body)) throw new Error("request body is empty")
        const { username, email, password } = req.body
        const validUser = await validateUser({ username, email, password })
        if (!validUser) throw new Error("data is invalid")
        const user = await getUser(email)
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) throw new Error("password is incorrect")
        const token = jwt.sign({ id: user.id, username: user.username }, config.SECRET_JWT, {
            expiresIn:"1h"
        })
        console.log(token)
    } catch (error) {
        res.status(400).json({ error: true, msg: error.message })
    }
}

export default login;