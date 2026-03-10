import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuarioById, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} from '../controllers/usuario.controller';

const router = Router();

router.get('/', getUsuarios);           // GET http://localhost:3000/usuarios
router.get('/:id', getUsuarioById);     // GET http://localhost:3000/usuarios/1
router.post('/', createUsuario);        // POST http://localhost:3000/usuarios
router.put('/:id', updateUsuario);      // PUT http://localhost:3000/usuarios/1
router.delete('/:id', deleteUsuario);   // DELETE http://localhost:3000/usuarios/1

export default router;