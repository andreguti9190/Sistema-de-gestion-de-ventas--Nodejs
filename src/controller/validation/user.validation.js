import z from "zod";

const schemmaUUID = z.uuid()
const schemmaName = z.string().min(3);
const schemmaEmail = z.email();
const schemmaPassword = z.string().min(8)
const schemmaRoleId = z.int().min(1).max(2);
const schemmaIsActive = z.boolean();

const schemmaUser = z.object({
    name: schemmaName,
    email: schemmaEmail,
    password: schemmaPassword,
    roleId: schemmaRoleId,
    isActive: schemmaIsActive
})

export const validateUUID = async (id) => {
    const result = await schemmaUUID.safeParseAsync(id)
    return result.success
}

export const validateUser = async (name, email, password, roleId, isActive) => {
    const result = await schemmaUser.safeParseAsync({
        name: name,
        email: email,
        password: password,
        roleId: roleId,
        isActive: isActive
    });

    return result.success
}
export const validateUserSoft = async (name, email, password, roleId, isActive) => {
    let success = true;

    if (typeof name != "undefined") success = (await schemmaName.safeParseAsync(name)).success
    if (typeof email != "undefined") success = (await schemmaEmail.safeParseAsync(email)).success
    if (typeof password != "undefined") success = (await schemmaPassword.safeParseAsync(password)).success
    if (typeof roleId != "undefined") success = (await schemmaRoleId.safeParseAsync(roleId)).success
    if (typeof isActive != "undefined") success = (await schemmaIsActive.safeParseAsync(isActive)).success
    
    return success
}