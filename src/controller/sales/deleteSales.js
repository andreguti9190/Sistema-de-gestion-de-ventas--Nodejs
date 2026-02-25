
import { deleteSales } from "../../model/sales.model.js"
import { validateUUID } from "../validation/sales.validation.js"

const deleteSalesController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "the id is invalid" })
    const data = await deleteSales(id);
    if (data.error) return res.status(400).send(data)
    else return res.status(200).send(data)
}

export default deleteSalesController;