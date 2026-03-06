import crypto from "node:crypto"
import { pool } from "./pool.js"

export const signup = (id, name, email, password) => {
    return pool.query(
        `INSERT INTO users(id,name,email,password,role_id) VALUES (UUID_TO_BIN(?),?,?,?,2)`,
        [id, name, email, password]
    ).then(data => {
        return true
    }).catch(err => {
        throw new Error("the email has been registered")
    })
}

export const getUser = async (email) => {
    return pool.query(
        `SELECT BIN_TO_UUID(u.id) as id,
        u.name as username,
        u.email as email,
        u.password as password,
        r.name as roleId
        FROM users AS u 
        INNER JOIN roles AS r ON r.id = u.role_id
        WHERE email=?`,
        [email]
    ).then(data => {
        data = data[0]
        if (data.length == 0) throw new Error("No exist user")
        return data[0]
    }).catch(err => {
        console.log(err.message)
        throw new Error("Database error")
    })
}