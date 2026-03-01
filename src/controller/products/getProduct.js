import  {validateUUID} from "../../controller/validation/products.validation.js"
import { getProduct } from "../../model/product.model.js"

const getProductController = async (req, res) => {
    const id = req.params.id
    const validUUID =await validateUUID(id)
    if(!validUUID) return res.status(400).json({error:true,msg:"the id is invalid"})
    const data = await getProduct(id)
    if(data.error) return res.status(409).json(data);
    return res.status(200).json(data)
}


export default getProductController;