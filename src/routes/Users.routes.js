import {Router} from 'express';
import { getUsers, getUserById, registerUser, updateUser, deleteUser, getUserByName } from '../controllers/Users.Controllers.js';

const router = Router();

router.get('/api/v1/', (req, res) => {res.send('Ruta funcionando');});
router.get('/api/v1/users', getUsers);
router.get('/api/v1/users/search', getUserByName);
router.post('/api/v1/users/register', registerUser);
router.get('/api/v1/users/:id_User', getUserById);
router.put('/api/v1/users/:id_User', updateUser);
router.delete('/api/v1/users/:id_User', deleteUser);

export default router