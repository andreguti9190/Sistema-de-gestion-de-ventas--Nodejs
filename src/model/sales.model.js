import crypto from "node:crypto"
import { pool } from "./pool.js"

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
                    [value.quantity,value.productId]
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
        data.forEach((value)=>{
            if(value.stock<0) throw new Error("stock negativo") 
        })
        await conn.commit();
        return {error:false,saleId:uuidSales}
    } catch (error) {
        conn.rollback();
        return {error:true,msg:"consulta fallo"}
    }
}