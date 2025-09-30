import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import prodCartRoutes from './src/routes/prodCartRoutes.js';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';

config();

const PORT = process.env.PORT || "3001";
const app = express();
const version = '/api/v1';

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, 'uploads');

app.use('/uploads', express.static(uploadPath));

app.use(version, userRoutes);
app.use(version, productRoutes);
app.use(version, prodCartRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));