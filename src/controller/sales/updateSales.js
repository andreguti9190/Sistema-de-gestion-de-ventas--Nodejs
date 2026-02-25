
import { updateSales } from "../../model/sales.model.js"
import { validateSalesSoft, validateUUID } from "../validation/sales.validation.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const updateSalesController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "the id is invalid" })

    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })
    const { idSaleDetails, saleDetails } = req.body
    const validSales = await validateSalesSoft(idSaleDetails, saleDetails.productId, saleDetails.quantity)

    if (!validSales) return res.status(400).json({ error: true, msg: "the data is invalid" })
    const data = await updateSales(idSaleDetails, saleDetails.productId, saleDetails.quantity)
if(data.error) return res.status(400).json(data)
    else return res.status(200).json(data)
}

export default updateSalesController;