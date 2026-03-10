import express from 'express';

const app = express();
const PORT = 3000;

// 1. Configuración para entender JSON
app.use(express.json());

// 2. Nuestra "Base de Datos" temporal
interface Usuario {
    id: number;
    nombre: string;
    puesto: string;
}

let usuarios: Usuario[] = [
    { id: 1, nombre: "Miguel Valencia", puesto: "Backend Developer" },
    { id: 2, nombre: "Mati", puesto: "QA Tester" }
];

// --- RUTAS ---

// Home
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a mi API de Node.js",
        author: "Miguel Valencia",
        status: "Development Mode"
    });
});

// Suma (Tu lógica de parámetros)
app.get('/suma/:num1/:num2', (req, res) => {
    const { num1, num2 } = req.params;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: "Por favor, envía números válidos" });
    }
    res.json({ resultado: n1 + n2 });
});

// LISTAR usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// BUSCAR un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === idBuscado);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
});

// CREAR un usuario (Aquí estaba el choque, ¡ahora está arreglado!)
app.post('/usuarios', (req, res) => {
    const { nombre, puesto } = req.body;

    if (!nombre || !puesto) {
        return res.status(400).json({ error: "Faltan datos: nombre y puesto son obligatorios" });
    }

    const nuevoUsuario: Usuario = {
        id: usuarios.length + 1,
        nombre: nombre,
        puesto: puesto
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// EDITAR un usuario
app.put('/usuarios/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const { nombre, puesto } = req.body;

    // Buscamos el índice (la posición) del usuario en el array
    const indice = usuarios.findIndex(u => u.id === idBuscado);

    if (indice === -1) {
        return res.status(404).json({ error: "Usuario no encontrado para editar" });
    }

    // Actualizamos los datos manteniendo el mismo ID
    usuarios[indice] = { id: idBuscado, nombre, puesto };

    res.json({
        message: "Usuario actualizado con éxito",
        usuario: usuarios[indice]
    });
});

// ELIMINAR un usuario
app.delete('/usuarios/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    
    // Filtramos el array: nos quedamos con todos MENOS con el que tiene el ID buscado
    const totalAntes = usuarios.length;
    usuarios = usuarios.filter(u => u.id !== idBuscado);

    if (usuarios.length === totalAntes) {
        return res.status(404).json({ error: "No se encontró el usuario para borrar" });
    }

    res.json({ message: `Usuario con ID ${idBuscado} eliminado correctamente` });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en escucha en http://localhost:3000`);
});