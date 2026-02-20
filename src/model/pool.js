import mysql from "mysql2/promise";
import config from "../config.js";

export const pool = mysql.createPool({
    host: config.HOST_DATABASE,
    port: config.PORT_DATABASE,
    user: config.USER_DATABASE,
    database: config.DATABASE_NAME,
    password: config.PASSWORD_DATABASE
})

export const getUUID = () => {
    return pool.query("SELECT UUID() as UUID")
        .then((row) => row[0][0]
        ).catch((err) => {
            throw new Error("Error Database")
        })
}
