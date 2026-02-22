
import { validateProductSoft, validateUUID } from "../validation/products.validation.js"
import { updateProduct } from "../../model/product.model.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const updateProductController = async (req, res) => {
    const id = req.params.id
    const validUUID = await validateUUID(id)
    if (!validUUID) return res.status(400).json({ error: true, msg: "the id is invalid" })

    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })
    const { name, description, price, stock, categoryId } = req.body
    const validProduct = validateProductSoft(name, description, price, stock, categoryId)
    if (!validProduct) return res.status(400).json({ error: true, msg: "the data format is invalid" })
    const data = await updateProduct(id, { name, description, price, stock, categoryId })
    if (data.error) return res.status(400).json(data)
    else return res.status(200).json({error:false,msg:"product modify sucessfully"})
}

export default updateProductController;