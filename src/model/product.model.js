import { pool, getUUID } from "./pool.js";

export function getProducts() {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,description,price,stock,category_id,created_at,updated_at  FROM products"
    ).then((row) => {
        return row[0]
    }).catch((err) => { return { error: true, msg: "Query of getProducts fail" } })
}
export function getProduct(id) {
    return pool.query(
        "SELECT BIN_TO_UUID(id) as id,name,description,price,stock,category_id,created_at,updated_at FROM products WHERE id = UUID_TO_BIN(?)",
        id
    ).then((row) => {
        if (row[0].length === 0) return { error: true, msg: "Product no exits" }
        else return { error: false, msg: "Product got sucessfully", product: row[0][0] }
    }).catch((err) => { return { error: true, msg: "Query of getProduct fail" } })
}

export function createProduct(name, description, price, stock, categoryId) {
    return getUUID()
        .then(({ UUID }) => {
            return pool.query(
                `INSERT INTO products 
                (id,name,description,price,stock,category_id) 
                VALUES (UUID_TO_BIN(?),?,?,?,?,?)`,
                [UUID, name, description, price, stock, categoryId]
            )
        }).then(() => {
            return { error: false, msg: "Product created sucessfully" }
        }).catch((err) => {
            return { error: true, msg: "Query of createProduct fail" }
        })
}
export function updateProduct(id, fields) {
    const { name, description, price, stock, categoryId } = fields
    return pool.query(
        `UPDATE products SET
        name= IFNULL(?,name),
        description= IFNULL(?,description),
        price = IFNULL(?,price),
        stock = IFNULL(?,stock),
        category_id = IFNULL(?,category_id) 
        WHERE id=UUID_TO_BIN(?)`,
        [name, description, price, stock, categoryId, id]
    ).then((row) => {
        return { error: false, msg: row }
    }).catch((err) => { return { error: true, msg: "Query of updateproducts fail" } })
}
export function deleteProduct(id) {
    if (!id) return { error: true, msg: "the id field is missing" }
    return pool.query(
        `SELECT BIN_TO_UUID(id) as idSaleDetails, BIN_TO_UUID(sale_id) as idSale FROM sale_details WHERE product_id = UUID_TO_BIN(?)`,
        [id]
    ).then((value) => {
        if(value[0].length != 0) throw new Error(JSON.stringify({error:true,msg:"there are sales with this product",salesList:value[0]}))
        return pool.query(
            "DELETE FROM products WHERE id = UUID_TO_BIN(?)",
            [id]
        )
    }).then((row) => {
        return { error: false, msg: "Product deleted successfully" };
    }).catch((e) => {
        return JSON.parse(e.message);
    })
}