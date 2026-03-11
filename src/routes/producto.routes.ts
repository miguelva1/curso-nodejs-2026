import { deleteProducto,createProducto,updateProducto, getProductos } from '../controllers/producto.controller';
import { Router } from 'express';




const router = Router();

router.get('/', getProductos);           // GET http://localhost:3000/productos
router.post('/', createProducto);        // POST http://localhost:3000/productos
router.put('/:id', updateProducto);      // PUT http://localhost:3000/productos/1
router.delete('/:id', deleteProducto);   // DELETE http://localhost:3000/productos/1

export default router;