import z from "zod";

const schemmaUserId = z.uuid();
const schemmaOrdenDetails = z.array(z.object({
    productId: z.uuid(),
    quantity: z.number().min(0)
})).min(1)

const schemmaQuantity = z.int().min(0)

const schemmaOrden = z.object({
    userId: schemmaUserId,
    ordenDetails: schemmaOrdenDetails
})

export const validateUUID = async (id) => {
    const result = await schemmaUserId.safeParseAsync(id)
    return result.success
}

export const validateSales = async (userId, ordenDetails) => {
    const valid = await schemmaOrden.safeParseAsync({
        userId: userId,
        ordenDetails: ordenDetails
    })
    return valid.success
}

export const validateSalesSoft = async (saleDetailsId, productId, quantity) => {
    let success = true;
    success = (await schemmaUserId.safeParseAsync(saleDetailsId)).success
    if(!success) return false
    if (typeof productId != "undefined") {
        success = (await schemmaUserId.safeParseAsync(productId)).success
        if (!success) return false
    }
    if (typeof quantity != "undefined") {
        success = (await schemmaQuantity.safeParseAsync(quantity)).success
        if (!success) return false
    }

    return success
}