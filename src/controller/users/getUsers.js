import { getUsers } from "../../model/users.model.js";

const getUsersController = async (req, res) => {
    const users = await getUsers()
    return res.status(200).json({error:false,listUsers:users})
}


export default getUsersController;