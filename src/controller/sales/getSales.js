import { getSales } from "../../model/sales.model.js";

const getSalesController = async (req,res) => {
    const data = await getSales()
    return res.status(200).json(data)
}


export default getSalesController;