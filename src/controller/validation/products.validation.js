import z from "zod";

const schemmaUUID = z.uuid()
const schemmaName = z.string().min(3)
const schemmaDescription = z.string().min(3).max(3000)
const schemmaPrice = z.number().int().min(0)
const schemmaStock = z.number().int().min(0)
const schemmaCategoriesID = z.number().int().min(0)

const schemmaProducts = z.object({
    name: schemmaName,
    price: schemmaPrice,
    description: schemmaDescription,
    stock: schemmaStock,
    categoriesID: schemmaCategoriesID
});


export const validateUUID = async (id) => {
    const result = await schemmaUUID.safeParseAsync(id)
    return result.success
}

export const validateProduct = async (name, description, price, stock, categoriesID) => {
    const result = await schemmaProducts.safeParseAsync({
        name,
        price,
        description,
        stock,
        categoriesID
    });

    return result.success
}
export const validateProductSoft = async (name, description, price, stock, categoriesID) => {
    let success = true;

    if (typeof name != "undefined") success = (await schemmaName.safeParseAsync(name)).success
    if (typeof description != "undefined") success = (await schemmaDescription.safeParseAsync(description)).success
    if (typeof price != "undefined") success = (await schemmaPrice.safeParseAsync(price)).success
    if (typeof stock != "undefined") success = (await schemmaStock.safeParseAsync(stock)).success
    if (typeof categoriesID != "undefined") success = (await schemmaCategoriesID.safeParseAsync(categoriesID)).success

    return success
}