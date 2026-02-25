import crypto from "node:crypto"
import { pool } from "./pool.js"
import { error } from "node:console"

export const getSales = async () => {
    try {
        const result = (await pool.query(
            `SELECT BIN_TO_UUID(sales.id) as idSales,
        BIN_TO_UUID(sale_details.id) as idSalesDetails,
        BIN_TO_UUID(sales.user_id) as userId,
        users.name as userName,
        BIN_TO_UUID(sale_details.product_id) as idProduct,
        products.name as nameProduct,
        sale_details.quantity as quantity,
        products.price as price,
        quantity * price as total
        FROM sales INNER JOIN sale_details ON sales.id = sale_details.sale_id
        INNER JOIN products ON sale_details.product_id = products.id
        INNER JOIN users ON sales.user_id = users.id`
        ))[0]
        return { error: false, data: result }
    } catch (error) {
        console.log(error)
    }
}
export const getSale = async (id) => {
    if (!id) return { error: true, msg: "no hay id" }
    const result = (await pool.query(
        `SELECT BIN_TO_UUID(sales.id) as idSales,
        BIN_TO_UUID(sale_details.id) as idSalesDetails,
        BIN_TO_UUID(sales.user_id) as userId,
        users.name as userName,
        BIN_TO_UUID(sale_details.product_id) as idProduct,
        products.name as nameProduct,
        sale_details.quantity as quantity,
        products.price as price,
        quantity * price as total
        FROM sales INNER JOIN sale_details ON sales.id = sale_details.sale_id
        INNER JOIN products ON sale_details.product_id = products.id
        INNER JOIN users ON sales.user_id = users.id
        WHERE sales.id=UUID_TO_BIN(?)`,
        [id]
    ))[0]
    return { error: false, data: result }
}


export const createSales = async (userId, ordenDetails) => {
    const conn = await pool.getConnection();
    try {
        const uuidSales = crypto.randomUUID();
        await conn.beginTransaction();

        await conn.query("INSERT INTO sales(id,user_id ) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?))", [uuidSales, userId])

        await Promise.all(
            ordenDetails.map(async (value) => {
                const uuidSalesOrden = crypto.randomUUID();
                await conn.query(
                    `UPDATE products SET stock=stock- ?
                    WHERE id= UUID_TO_BIN(?)`,
                    [value.quantity, value.productId]
                )

                return await conn.query(
                    `INSERT INTO sale_details(id,sale_id,product_id,quantity)
                     VALUES (UUID_TO_BIN(?) ,UUID_TO_BIN(?) ,UUID_TO_BIN(?) ,?)`,
                    [uuidSalesOrden, uuidSales, value.productId, value.quantity]
                )
            })
        )
        const data = (await conn.query(
            `SELECT * FROM products`
        ))[0]
        data.forEach((value) => {
            if (value.stock < 0) throw new Error("stock negativo")
        })
        await conn.commit();
        return { error: false, saleId: uuidSales }
    } catch (error) {
        conn.rollback();
        return { error: true, msg: "consulta fallo" }
    }
}