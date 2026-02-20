import { pool, getUUID } from "./pool.js";

export function getUser(id) {
    return pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    ).then((row) => {
        if (row[0].length === 0) return { error: true, msg: "User no exits" }
        else return { error: false, msg: "User got sucessfully", user: row[0][0] }
    }).catch((err) => { return { error: true, msg: "Query of getUser fail" } })
}

export function createUser(name, email, password, role_id) {
    getUUID()
        .then(({ UUID }) => {
            return pool.query(
                "INSERT INTO users (id,name,email,password,role_id) VALUES (UUID_TO_BIN(?),?,?,?,?)",
                [UUID, name, email, password, role_id]
            )
        }).then(() => {
            return { error: false, msg: "User created sucessfully" }
        }).catch((err) => {
            return { error: true, msg: "Query of createUser fail" }
        })
}
export function updateUser(id, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return Promise.resolve({ error: true, msg: "There are no fields" })
    const setClause = keys.map(key => `${key} = ?`).join(", ")
    const values = [...keys.map(key => fields[key]), id]

    return pool.query(
        `UPDATE users SET ${setClause} WHERE id=UUID_TO_BIN(?)`,
        values
    ).then((row) => {
        console.log(row)
    }).catch((err) => { return { error: true, msg: "Query of updateuser fail" } })
}
export function deleteUser(id) {
    if (!id) return { error: true, msg: "the id field is missing" }
    return pool.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    ).then((row)=>{
        console.log(row)
        return { error: false, msg: "User deleted successfully" };
    }).catch(()=>{
        return { error: false, msg: "Query of deleteuser fail" };
    })
}