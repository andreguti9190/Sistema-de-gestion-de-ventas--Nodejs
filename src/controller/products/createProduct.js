import { validateProduct } from "../validation/products.validation.js";
import { createProduct } from "../../model/product.model.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const createProductController = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })

    const { name, description, stock, price, categoriesID } = req.body;
    const validInformation = await validateProduct(name, description, stock, price, categoriesID);

    if (!validInformation) return res.status(400).json({ error: true, msg: "information format is incorrect" })

    const data = await createProduct(name, description, price, stock, categoriesID)
    if (data.error) return res.status(400).json(data)

    else return res.status(200).json(data)
}

export default createProductController;