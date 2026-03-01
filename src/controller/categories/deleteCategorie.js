
import { validateId } from "../validation/categorie.validation.js";
import { deleteCategorie } from "../../model/categorie.model.js"

const deleteCategorieController = async (req, res) => {
    const id = req.params.id
    const validId = await validateId(id)
    if (!validId) return res.status(400).json({ error: true, msg: "id is invalid" })
    const data = await deleteCategorie(id)
    if (data.error) return res.status(409).json(data)
    else return res.status(200).json(data)
}

export default deleteCategorieController;