import {Router} from 'express';
import { getSuscriptions, getSuscripcionById, registerSuscripcion, updateSuscripcion, deleteSuscripcion} from '../controllers/Suscription.Controllers.js';

const router = Router();

router.get('/api/v1/suscriptions', getSuscriptions);
router.get('/api/v1/suscriptions/:id_Subscription', getSuscripcionById);
router.post('/api/v1/suscriptions', registerSuscripcion);
router.put('/api/v1/suscriptions/:id_Subscription', updateSuscripcion);
router.delete('/api/v1/suscriptions/:id_Subscription', deleteSuscripcion);

export default router