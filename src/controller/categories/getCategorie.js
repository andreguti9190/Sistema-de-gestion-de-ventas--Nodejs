
import { getCategorie } from "../../model/categorie.model.js"

function getCategorieController(req, res) {
    const id = req.params.id
    getCategorie(id)
        .then(value => {
            if(value.error) return res.status(400).json(value)
            return res.status(200).json(value)
        }).catch(err=>{
            return res.status(400).json({error:true,msg:"database has a error"})
        })
}

export default getCategorieController;