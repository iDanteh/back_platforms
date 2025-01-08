import {Router} from 'express';
import {sendWhatsAppMessage} from '../controllers/WhatsApp.Contoller.js';

const router = Router();

router.post('/api/v1/send-message', sendWhatsAppMessage);

export default router;