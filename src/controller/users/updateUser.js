import { updateUser } from "../../model/users.model.js"
import { validateUUID, validateUserSoft } from "../validation/user.validation.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const updateUserController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "Id is invalid" })
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" });
    const { name, email, password, roleId, isActive } = req.body
    const validInformation = await validateUserSoft(name, email, password, roleId, isActive);

    if (!validInformation) return res.status(400).json({ error: true, msg: "information format is incorrect" })

    let data= await updateUser(id, { name, email, password, roleId, isActive });
    if(data.error) return res.status(409).json({ error: true, msg: "user id no exist" })

    return res.status(200).json({ error: true, msg: "User update sucessfully" })
}

export default updateUserController;