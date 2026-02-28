import { getClients } from "../../model/clients.model.js";

const getClientsController = async (req, res) => {
    const users = await getClients()
    return res.status(200).json({error:false,listClients:users})
}


export default getClientsController;