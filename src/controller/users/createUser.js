import { createUser } from "../../model/users.model.js";
import { validateUser } from "../validation/user.validation.js";

const isEmpty = (body) => !body || Object.keys(body).length === 0

const createUserController = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })

    const { name, email, password, roleId, isActive } = req.body
    const validInformation = await validateUser(name, email, password, roleId, isActive);

    if (!validInformation) return res.status(400).json({ error: true, msg: "information format is incorrect" })

    let data = await createUser(name, email, password, roleId, isActive);
    if (data.error) return res.status(409).json({ error: true, msg: "user exist in database" })
        
    res.status(200).json(data)
}

export default createUserController;