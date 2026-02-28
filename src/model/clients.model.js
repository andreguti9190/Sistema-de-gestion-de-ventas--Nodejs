import { pool, getUUID } from "./pool.js";

export function getClients() {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,email FROM clients"
    ).then((row) => {
        return row[0]
    }).catch((err) => { return { error: true, msg: "Query of getUsers fail" } })
}
export function getClient(id) {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,email FROM clients WHERE id = UUID_TO_BIN(?)",
        id
    ).then((row) => {
        if (row[0].length === 0) return { error: true, msg: "Client no exits" }
        else return { error: false, msg: "Client got sucessfully", user: row[0][0] }
    }).catch((err) => { return { error: true, msg: "Query of getClient fail" } })
}

export function createClient(name, email) {
    return getUUID()
        .then(({ UUID }) => {
            return pool.query(
                "INSERT INTO clients (id,name,email) VALUES (UUID_TO_BIN(?),?,?)",
                [UUID, name, email]
            )
        }).then(() => {
            return { error: false, msg: "Client created sucessfully" }
        }).catch((err) => {
            return { error: true, msg: "Query of createClient fail" }
        })
}
export function updateClient(id, fields) {
    const { name, email } = fields
    return pool.query(
        `UPDATE clients SET
        name= IFNULL(?,name),
        email = IFNULL(?,email)
        WHERE id=UUID_TO_BIN(?)`,
        [name, email, id]
    ).then((row) => {
        return { error: false, msg: row }
    }).catch((err) => { return { error: true, msg: "Query of updateuser fail" } })
}
export function deleteClient(id) {
    if (!id) return { error: true, msg: "the id field is missing" }
    return pool.query(
        "DELETE FROM clients WHERE id = UUID_TO_BIN(?)",
        [id]
    ).then((row) => {
        return { error: false, msg: "Client deleted successfully" };
    }).catch(() => {
        return { error: true, msg: "Query of deleteClient fail" };
    })
}