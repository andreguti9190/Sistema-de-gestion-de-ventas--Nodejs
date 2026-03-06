import jwt from "jsonwebtoken";
import config from "../config.js";

const logged = async (req, res, next) => {
    const token = req.cookies.AccessToken
    if (!token) return res.status(401).json({ error: true, msg: "User dont have authentique" })
    const pass = jwt.verify(token, config.SECRET_JWT)
    if (!pass) return res.status(401).json({ error: true, msg: "token is invalid" })
    next()
}

export default logged;