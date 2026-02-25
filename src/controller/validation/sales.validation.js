import z from "zod";

const schemmaUserId = z.uuid();
const schemmaOrdenDetails = z.array(z.object({
    productId: z.uuid(),
    quantity: z.number().min(0)
})).min(1)

const schemmaOrden = z.object({
    userId: schemmaUserId,
    ordenDetails: schemmaOrdenDetails
})

export const validateSales = async (userId, ordenDetails) => {
    const valid = await schemmaOrden.safeParseAsync({
        userId:userId,
        ordenDetails:ordenDetails
    })
    return valid.success
}