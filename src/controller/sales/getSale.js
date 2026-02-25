
import { getSale } from "../../model/sales.model.js";
import { validateUUID } from "../validation/sales.validation.js";

const getSaleController =async (req,res) => {
    const id = req.params.id
    const validUUID =await validateUUID(id);
    if(!validUUID) return res.status(400).json({error:true,msg:"id is invalid"})
    const data=await getSale(id);
    return res.status(200).json(data)
}

export default getSaleController;