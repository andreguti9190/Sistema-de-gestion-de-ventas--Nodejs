
import { validateSales } from "../validation/sales.validation.js"
import { createSales } from "../../model/sales.model.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const createSalesController = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "the request body is empty" })

    const { clientId, ordenDetails } = req.body

    const validOrden = await validateSales(clientId , ordenDetails)
    if (!validOrden) return res.status(400).json({ error: true, msg: "the data is invalid" })
    const data = await createSales(clientId, ordenDetails)
    if (data.error) return res.status(409).json(data)
    return res.status(200).json(data)
}

export default createSalesController;