import {validateUUID} from "../validation/client.validation.js"
import { deleteClient } from "../../model/clients.model.js"

const deleteClientController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "Id is invalid" })
    const data = await deleteClient(id)
    if (data.error) return res.status(409).json(data)
    return res.status(200).json(data)
}

export default deleteClientController;