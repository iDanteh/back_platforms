import {Router} from 'express';
import { login, register, deleteAdmin, updateAdmin, getAdminById } from '../controllers/Admin.Controllers.js';

const router = Router();

router.get('/api/v1/admin/:id_Admin', getAdminById)
router.post('/api/v1/admin/login', login);
router.post('/api/v1/admin/register', register);
router.delete('/api/v1/admin/:id_Admin', deleteAdmin);
router.put('/api/v1/admin/:id_Admin', updateAdmin);

export default router;