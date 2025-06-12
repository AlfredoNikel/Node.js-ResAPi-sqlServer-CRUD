// Importamos el Router de Express
import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controllers.js";


// Importamos el Router de Express
const router = Router();

// obtenemos todos los productos
router.get("/productos", getProducts);

// obtenemos un producto por su ID
router.get("/productos/:id", getProductById);

// creamos un producto
router.post("/productos/", createProduct);

// actualizamos un producto por su ID
router.put("/productos/:id", updateProduct);

// eliminamos un producto por su ID
router.delete("/productos/:id", deleteProduct);

export default router;
