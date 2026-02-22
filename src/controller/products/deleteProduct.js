
import { deleteProduct } from "../../model/product.model.js"
import { validateUUID } from "../validation/products.validation.js"

const deleteProductController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "the id is invalid" })
    const data = await deleteProduct(id)
    if (data.error) return res.status(400).json(data)
    else return res.status(200).json(data)
}

export default deleteProductController;