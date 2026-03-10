import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';

// Nuestra "Base de Datos" ahora vive en el controlador
let usuarios: Usuario[] = [
    { id: 1, nombre: "Miguel Valencia", puesto: "Backend Developer" },
    { id: 2, nombre: "Mati", puesto: "QA Tester" }
];

// 1. Obtener todos los usuarios
export const getUsuarios = (req: Request, res: Response) => {
    res.json(usuarios);
};

// 2. Obtener un usuario por ID
export const getUsuarioById = (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const usuario = usuarios.find(u => u.id === idBuscado);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
};

// 3. Crear un usuario
export const createUsuario = (req: Request, res: Response) => {
    const { nombre, puesto } = req.body;

    if (!nombre || !puesto) {
        return res.status(400).json({ error: "Faltan datos: nombre y puesto son obligatorios" });
    }

    const nuevoUsuario: Usuario = {
        id: usuarios.length + 1,
        nombre,
        puesto
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

// 4. Editar un usuario
export const updateUsuario = (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const { nombre, puesto } = req.body;
    const indice = usuarios.findIndex(u => u.id === idBuscado);

    if (indice === -1) {
        return res.status(404).json({ error: "Usuario no encontrado para editar" });
    }

    usuarios[indice] = { id: idBuscado, nombre, puesto };
    res.json({ message: "Actualizado con éxito", usuario: usuarios[indice] });
};

// 5. Eliminar un usuario
export const deleteUsuario = (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const totalAntes = usuarios.length;
    
    usuarios = usuarios.filter(u => u.id !== idBuscado);

    if (usuarios.length === totalAntes) {
        return res.status(404).json({ error: "No se encontró el usuario" });
    }

    res.json({ message: `Usuario ${idBuscado} eliminado` });
};