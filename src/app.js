import express from 'express';
import productsRoutes from './routes/products.routes.js';
import cors from 'cors';

// Importamos el Router de Express
const app = express();
app.use(cors()); // Middleware para habilitar CORS
app.use(express.json()); // Middleware para parsear JSON

app.use(productsRoutes); // Usamos las rutas de productos

export default app; 
