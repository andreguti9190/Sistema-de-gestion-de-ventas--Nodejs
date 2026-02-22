
import { validateCategorie } from "../validation/categorie.validation.js"
import { createCategorie } from "../../model/categorie.model.js"

const isEmpty = (body) => !body || Object.keys(body).length == 0

const createCategorieController = async (req, res) => {
    if (isEmpty(req.body)) return res.status(400).json({ error: true, msg: "request body is empty" })

    const { name } = req.body;

    const validCategorie = await validateCategorie(name)
    if (!validCategorie) return res.status(400).json({ error: true, msg: "categorie name is invalid" })

    const data = await createCategorie(name)
    if (data.error) return res.status(400).json({ error: true, msg: "categorie name exist" })
    return res.status(200).json({ error: false, msg: "categorie was created sucessfully" })
}

export default createCategorieController;