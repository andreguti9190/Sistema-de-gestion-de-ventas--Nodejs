import z from "zod";

const schemmaUser = z.object({
    username: z.string().min(3).max(25),
    email: z.email(),
    password: z.string().min(8)
})

export const validateUser = async (user) => {
    return schemmaUser.safeParseAsync(user)
        .then(data => {
            return data.success
        })
}