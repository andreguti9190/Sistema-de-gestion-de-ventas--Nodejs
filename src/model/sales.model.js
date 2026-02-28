import crypto from "node:crypto"
import { pool } from "./pool.js"

export const getSales = async () => {
    try {
        const result = (await pool.query(
            `SELECT BIN_TO_UUID(sales.id) as idSales,
        BIN_TO_UUID(sale_details.id) as idSalesDetails,
        BIN_TO_UUID(sales.clients_id) as clientsId,
        clients.name as clientsName,
        BIN_TO_UUID(sale_details.product_id) as idProduct,
        products.name as nameProduct,
        sale_details.quantity as quantity,
        products.price as price,
        quantity * price as total
        FROM sales INNER JOIN sale_details ON sales.id = sale_details.sale_id
        INNER JOIN products ON sale_details.product_id = products.id
        INNER JOIN clients ON sales.clients_id = clients.id`
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
        BIN_TO_UUID(sales.clients_id) as clientsId,
        clients.name as clientsName,
        BIN_TO_UUID(sale_details.product_id) as idProduct,
        products.name as nameProduct,
        sale_details.quantity as quantity,
        products.price as price,
        quantity * price as total
        FROM sales INNER JOIN sale_details ON sales.id = sale_details.sale_id
        INNER JOIN products ON sale_details.product_id = products.id
        INNER JOIN clients ON sales.clients_id = clients.id
        WHERE sales.id=UUID_TO_BIN(?)`,
        [id]
    ))[0]
    return { error: false, data: result }
}

export const deleteSales = async (salesId) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        await conn.query(
            `DELETE FROM sale_details WHERE sale_id = UUID_TO_BIN(?)`,
            [salesId]
        )
        await conn.query(
            `DELETE FROM sales WHERE id=UUID_TO_BIN(?)`,
            [salesId]
        )
        await conn.commit();
        return { error: false, msg: "sales was deleted sucessfully" }
    } catch (err) {
        conn.rollback();
        return { error: true, msg: "consulta fallo" }
    }
}

export const updateSales = async (idSaleDetails, idProduct, quantity) => {
    const conn = await pool.getConnection()

    try {
        let pass = false
        await conn.beginTransaction()
        const dataProduct = (await conn.query(
            `SELECT BIN_TO_UUID(id) as id, stock FROM products
            WHERE id = UUID_TO_BIN(?)`,
            [idProduct]
        ))[0]
        const dataSaleDetails = (await conn.query(
            `SELECT  quantity FROM sale_details
            WHERE id = UUID_TO_BIN(?)`,
            [idSaleDetails]
        ))[0]
        if (dataProduct.length == 0) throw new Error("No existe ese product");
        if (dataSaleDetails.length == 0) throw new Error("No existe ese idSales");
        const stockFree = dataProduct[0].stock + dataSaleDetails[0].quantity
        if(stockFree<quantity) throw new Error("No se puede ingrear es cantidad");
        console.log(dataProduct[0])
        console.log(dataSaleDetails[0])
        await conn.query(
            `UPDATE products SET 
            stock = stock - ?`
            ,[quantity - dataSaleDetails[0].quantity]
        )
        await conn.query(
            `UPDATE sale_details SET
            product_id= IFNULL(UUID_TO_BIN(?),product_id) ,
            quantity = IFNULL(?,quantity) 
            WHERE id=UUID_TO_BIN(?)`,
            [idProduct, quantity, idSaleDetails])
            ;
        await conn.commit();
        return { error: false, msg: "update was sucessfully" }
    } catch (err) {
        await conn.rollback();
        return { error: true, msg: "Query of updateproducts fail" }
    }
}

export const createSales = async (clientsId, ordenDetails) => {
    const conn = await pool.getConnection();
    try {
        const uuidSales = crypto.randomUUID();
        await conn.beginTransaction();

        await conn.query("INSERT INTO sales(id,clients_id ) VALUES (UUID_TO_BIN(?),UUID_TO_BIN(?))", [uuidSales, clientsId])

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