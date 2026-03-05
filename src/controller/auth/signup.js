import { validateUser } from "../validation/auth.validation.js"
import config from "../../config.js"
import bcrypt from "bcrypt"
import { signup } from "../../model/auth.model.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0


const signupController = async (req, res) => {
    try {
        if (isEmpty(req.body)) throw new Error("request body is empty")

        let { username, email, password } = req.body
        const validUser = await validateUser({ username, email, password })

        if (!validUser) throw new Error("data is invalid")
        password = await bcrypt.hash(password, config.SALT_HASH)

        await signup(username, email, password);
        return res.status(200).json({ error: false, msg: "User has been created sucessfully" })
    } catch (err) {
        res.status(400).json({ error: true, msg: err.message })
    }
}

export default signupController;