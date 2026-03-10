import express from 'express';
import dotenv from 'dotenv'; // 1. Importar dotenv
import usuarioRoutes from './routes/usuario.routes';

dotenv.config(); // 2. Cargar las variables

const app = express();
// 3. Usar el puerto del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor en modo ${process.env.NODE_ENV} corriendo en el puerto ${PORT}`);
});