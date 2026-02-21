import { pool, getUUID } from "./pool.js";

export function getUsers() {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,email,password,role_id,is_active,created_at,updated_at FROM users"
    ).then((row) => {
        return row[0]
    }).catch((err) => { return { error: true, msg: "Query of getUsers fail" } })
}
export function getUser(id) {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,email,password,role_id,is_active,created_at,updated_at FROM users WHERE id = UUID_TO_BIN(?)",
        id
    ).then((row) => {
        if (row[0].length === 0) return { error: true, msg: "User no exits" }
        else return { error: false, msg: "User got sucessfully", user: row[0][0] }
    }).catch((err) => { return { error: true, msg: "Query of getUser fail" } })
}

export function createUser(name, email, password, roleId, isActive) {
    return getUUID()
        .then(({ UUID }) => {
            return pool.query(
                "INSERT INTO users (id,name,email,password,role_id,is_active) VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
                [UUID, name, email, password, roleId, isActive]
            )
        }).then(() => {
            return { error: false, msg: "User created sucessfully" }
        }).catch((err) => {
            return { error: true, msg: "Query of createUser fail" }
        })
}
export function updateUser(id, fields) {
    const { name, email, password, roleId, isActive } = fields
    return pool.query(
        `UPDATE users SET
        name= IFNULL(?,name),
        email = IFNULL(?,email),
        password = IFNULL(?,password),
        role_id = IFNULL(?,role_id),
        is_active = IFNULL(?,is_active) 
        WHERE id=UUID_TO_BIN(?)`,
        [name, email, password, roleId, isActive, id]
    ).then((row) => {
        return { error: false, msg: row }
    }).catch((err) => { return { error: true, msg: "Query of updateuser fail" } })
}
export function deleteUser(id) {
    if (!id) return { error: true, msg: "the id field is missing" }
    return pool.query(
        "DELETE FROM users WHERE id = UUID_TO_BIN(?)",
        [id]
    ).then((row) => {
        return { error: false, msg: "User deleted successfully" };
    }).catch(() => {
        return { error: true, msg: "Query of deleteuser fail" };
    })
}