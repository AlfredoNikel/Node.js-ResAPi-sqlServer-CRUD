import {getConection} from "../database/conetion.js"; // Importamos la función para obtener la conexión a la base de datos

import sql from 'mssql';


// // Controladores para manejar las operaciones CRUD de producto

export const getProducts = async (req, res) => { 

    const pool = await getConection();
   const result = await pool.request().query("SELECT * FROM products");

   res.json(result.recordset);

}


export const getProductById = async(req, res)=>{

    console.log(req.params.id);

    const pool = await getConection();
    const result = await pool.request()
    .input("id", sql.Int, req.params.id) // Asegúrate de que el ID sea del tipo correcto
    .query("SELECT * FROM products WHERE id = @id")
    console.log(result);
    // Aquí deberías hacer una consulta a la base de datos para obtener el producto por su ID

    if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(result.recordset[0]); // Retornamos el primer producto encontrado
}


export const createProduct = async (req, res) => {
    console.log(req.body);

    const pool = await getConection();
    const result = await pool.request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("descripcion", sql.VarChar, req.body.descripcion)
    .input("quantity", sql.Int, req.body.quantity)
    .query("INSERT INTO products (name, price, descripcion, quantity) VALUES (@name, @price, @descripcion, @quantity); SELECT * FROM products WHERE id = SCOPE_IDENTITY()"); 
 // Usamos SCOPE_IDENTITY() para obtener el ID del último registro insertado

    console.log(result);
    
    res.json({id: result.recordset[0].id,
              name: req.body.name, 
              price: req.body.price, 
              descripcion: req.body.descripcion, 
              quantity: req.body.quantity});
    
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const pool = await getConection();
    const result = await pool.request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("descripcion", sql.VarChar, req.body.descripcion)
    .input("quantity", sql.Int, req.body.quantity)
    
    .query("UPDATE products SET name = @name, price = @price, descripcion = @descripcion, quantity = @quantity WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
        id: id,
        name: req.body.name,
        price: req.body.price,
        descripcion: req.body.descripcion,
        quantity: req.body.quantity
    });
}


export const deleteProduct = async (req, res) => {

    const pool = await getConection();
    const result = await pool.request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM products WHERE id = @id");
    console.log(result);
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    return res.json({ message: "Producto eliminado correctamente" });
    // Aquí deberías hacer una consulta a la base de datos para eliminar el producto por su ID
}
