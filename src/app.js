import express from 'express';
import productsRoutes from './routes/products.routes.js';

// Importamos el Router de Express
const app = express();

app.use(express.json()); // Middleware para parsear JSON

app.use(productsRoutes); // Usamos las rutas de productos

export default app; 
