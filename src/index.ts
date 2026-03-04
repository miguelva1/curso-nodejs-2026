import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// En Express 5, no hace falta importar Request/Response para rutas simples
app.get('/', (req, res) => {
    res.json({
        message: "¡Servidor Node.js con TypeScript activo!",
        fase: "Fase 1: El Despertar",
        status: "Online",
        version: "Express 5.x"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});