import { createClient } from "../../model/clients.model.js";
import { validateClient } from "../validation/client.validation.js";

const isEmpty = (body) => !body || Object.keys(body).length === 0

const createClientController = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })

    const { name, email} = req.body
    const validInformation = await validateClient(name, email);

    if (!validInformation) return res.status(400).json({ error: true, msg: "information format is incorrect" })

    let data = await createClient(name, email);
    if (data.error) return res.status(409).json({ error: true, msg: "user exist in database" })
        
    res.status(200).json(data)
}

export default createClientController;