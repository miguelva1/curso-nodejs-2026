import "reflect-metadata"; 
import express from "express";
import dotenv from "dotenv"; // 1. Importar dotenv para leer el puerto
import { AppDataSource } from "./config/data-source";
import productoRoutes from "./routes/producto.routes";
import usuarioRoutes from "./routes/usuario.routes"; // 2. Importar tus nuevas rutas de usuarios

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // 3. Usar el puerto del .env

app.use(express.json());

// Registrar Rutas
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes); // 4. Registrar las rutas de usuarios

// Inicializar la Base de Datos
AppDataSource.initialize()
    .then(() => {
        console.log("🚀 Base de datos conectada con éxito");
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("❌ Error al conectar la DB:", error));