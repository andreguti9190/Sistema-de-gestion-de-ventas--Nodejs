import z from "zod";

const schemmaName = z.string().min(3)

export const validateCategorie = async (categorie) => {
    let result = await schemmaName.safeParseAsync(categorie)
    return result.success;
}