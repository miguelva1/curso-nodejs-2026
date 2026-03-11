import { Request, Response } from 'express';
import { AppDataSource } from "../config/data-source";
import { Producto } from "../models/producto.model";

// Obtenemos el "repositorio" para la entidad Producto
const productoRepository = AppDataSource.getRepository(Producto);

export const getProductos = async (req: Request, res: Response) => {
    // .find() equivale a "SELECT * FROM producto"
    const productos = await productoRepository.find();
    res.json(productos);
};

export const createProducto = async (req: Request, res: Response) => {
    const { nombre, precio, stock } = req.body;
    
    // Tus validaciones siguen siendo igual de importantes
    if (!nombre || precio === undefined || stock === undefined) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Creamos la instancia y la guardamos (.save() hace el INSERT)
    const nuevoProducto = productoRepository.create({ nombre, precio, stock });
    await productoRepository.save(nuevoProducto);
    
    res.status(201).json(nuevoProducto);
};

export const updateProducto = async (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    const { nombre, precio, stock } = req.body;

    const producto = await productoRepository.findOneBy({ id: idBuscado });

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizamos los campos (.save() ahora hace un UPDATE porque ya tiene ID)
    productoRepository.merge(producto, { nombre, precio, stock });
    const resultado = await productoRepository.save(producto);
    
    res.json(resultado);
};

export const deleteProducto = async (req: Request, res: Response) => {
    const idBuscado = parseInt(req.params.id as string);
    
    // .delete() equivale a "DELETE FROM producto WHERE id = ..."
    const resultado = await productoRepository.delete(idBuscado);

    if (resultado.affected === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
};