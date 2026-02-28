import z from "zod";

const schemmaUUID = z.uuid()
const schemmaName = z.string().min(3);
const schemmaEmail = z.email(); 

const schemmaUser = z.object({
    name: schemmaName,
    email: schemmaEmail
})

export const validateUUID = async (id) => {
    const result = await schemmaUUID.safeParseAsync(id)
    return result.success
}

export const validateClient = async (name, email) => {
    const result = await schemmaUser.safeParseAsync({
        name: name,
        email: email,
    });

    return result.success
}
export const validateClientSoft = async (name, email) => {
    let success = true;

    if (typeof name != "undefined") success = (await schemmaName.safeParseAsync(name)).success
    if (typeof email != "undefined") success = (await schemmaEmail.safeParseAsync(email)).success
    
    return success
}