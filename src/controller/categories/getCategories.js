
import {getCategories} from "../../model/categorie.model.js"

function getCategoriesController(req,res) {
    getCategories()
    .then((value)=>{
        return res.status(200).json({error:false,categorieList:value})
    }).catch((err)=>{
        return res.status(400).json(err)
    })
}

export default getCategoriesController