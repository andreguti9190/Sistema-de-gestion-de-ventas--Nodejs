
import { getUser } from "../../model/users.model.js";
import { validateUUID } from "../validation/user.validation.js";

const getUserController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg:"Id is invalid" })
    const data = await getUser(id)
    if (data.error) return res.status(409).json(data)
    else return res.status(200).json({ error: false, user: data.user })
}

export default getUserController;