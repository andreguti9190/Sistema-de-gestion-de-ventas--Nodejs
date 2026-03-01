
import { getProducts } from "../../model/product.model.js"

const getProductsController = async (req, res) => {
    const data=await getProducts()
    if(data.error) return res.status(409).json(data);
    return res.status(200).json(data)
}

export default getProductsController;