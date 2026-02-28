import z from "zod";

const schemmaName = z.string().min(3)
const schemmaId = z.int().min(1)

export const validateCategorie = async (categorie) => {
    let result = await schemmaName.safeParseAsync(categorie)
    return result.success;
}
export const validateId = async (id) => {
    id = parseInt(id);
    const success = (await schemmaId.safeParseAsync(id)).success
    return success
}