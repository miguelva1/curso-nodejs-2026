import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Ruta de bienvenida (Home)
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a mi API de Node.js",
        author: "Miguel Valencia",
        status: "Development Mode"
    });
});

// 2. Ruta con Parámetros (URL Params)
// Prueba en el navegador: http://localhost:3000/saludo/miguel
app.get('/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.json({
        saludo: `Hola ${nombre}, ¡tu API está reconociendo parámetros!`,
        timestamp: new Date().toLocaleString()
    });
});

app.get('/suma/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    // Si alguno no es un número, enviamos un error 400 (Bad Request)
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: "Por favor, envía números válidos" });
    }

    res.json({ resultado: n1 + n2 });
});


// 3. Ruta de prueba para POST (Recibir datos)
app.post('/usuarios', (req, res) => {
    const datosRecibidos = req.body;
    res.status(201).json({
        message: "Usuario creado (simulado)",
        user: datosRecibidos
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en escucha en http://localhost:3000`);
});