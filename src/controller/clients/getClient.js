
import { getClient } from "../../model/clients.model.js";
import { validateUUID } from "../validation/client.validation.js";

const getClientController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg:"Id is invalid" })
    const data = await getClient(id)
    if (data.error) return res.status(409).json(data)
    else return res.status(200).json({ error: false, client: data.user })
}

export default getClientController;