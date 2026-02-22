import { pool } from "./pool.js";

export function getCategories() {
    return pool.query(
        "SELECT * FROM categories"
    ).then((row) => {
        return row[0]
    }).catch((err) => { return { error: true, msg: "Query of getCategorie fail" } })
}
export function getCategorie(id) {
    return pool.query(
        "SELECT * FROM categories WHERE id = ?",
        id
    ).then((row) => {
        if (row[0].length === 0) return { error: true, msg: "Categorie no exits" }
        else return { error: false, msg: "Categorie got sucessfully", user: row[0][0] }
    }).catch((err) => { return { error: true, msg: "Query of getCategorie fail" } })
}

export function createCategorie(name) {
    return pool.query(
        "INSERT INTO categories (name) VALUES (?)",
        [name]
    ).then(() => {
        return { error: false, msg: "User created sucessfully" }
    }).catch((err) => {
        return { error: true, msg: "Query of createCategories fail" }
    })
}
export function deleteCategorie(id) {
    if (!id) return { error: true, msg: "the id field is missing" }
    return pool.query(
        "DELETE FROM cateogories WHERE id = ?",
        [id]
    ).then((row) => {
        return { error: false, msg: "Categorie deleted successfully" };
    }).catch(() => {
        return { error: true, msg: "Query of deleteCategorie fail" };
    })
}