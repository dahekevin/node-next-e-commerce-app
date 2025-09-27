import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import prodCartRoutes from './src/routes/prodCartRoutes.js';

config();

const version = '/api/v1/';

const port = process.env.PORT || "3000";
const app = express();

app.use(cors());
app.use(express.json());

app.use(version, userRoutes);
app.use(version, productRoutes);
app.use(version, prodCartRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));