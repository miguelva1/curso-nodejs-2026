import { Request, Response } from 'express';
import { AppDataSource } from "../config/data-source";
import { Usuario } from '../models/usuario.model';


const usuarioRepository = AppDataSource.getRepository(Usuario);

// 1. Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await usuarioRepository.find();
    res.json(usuarios);
};

// 2. Obtener un usuario por ID
export const getUsuarioById = async (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const usuario = await usuarioRepository.findOneBy({ id: idBuscado });   

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
};

// 3. Crear un usuario
export const createUsuario = async (req: Request, res: Response) => {
    const { nombre, puesto } = req.body;

    if (!nombre || !puesto) {
        return res.status(400).json({ error: "Faltan datos: nombre y puesto son obligatorios" });
    }

    const nuevoUsuario = usuarioRepository.create({ nombre, puesto });
    await usuarioRepository.save(nuevoUsuario);
    
    res.status(201).json(nuevoUsuario);
};

// 4. Editar un usuario
export const updateUsuario = async (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const { nombre, puesto } = req.body;
    const usuario = await usuarioRepository.findOneBy({ id: idBuscado });

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado para editar" });
    }

    usuarioRepository.merge(usuario, { nombre, puesto });
    const resultado = await usuarioRepository.save(usuario);

    res.json(resultado);
};

// 5. Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const resultado = await usuarioRepository.delete(idBuscado);

    if (resultado.affected === 0) {
        return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
    }
    

    res.json({ message: `Usuario ${idBuscado} eliminado` });
};