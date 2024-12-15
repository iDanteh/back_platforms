import {Router} from 'express'
import {getPlatforms, getPlatformById, registerPlatform, updatePlatform, delePlatform} from '../controllers/Platform.Controllers.js';

const router = Router();

router.get('/api/v1/platform', getPlatforms);
router.get('/api/v1/platform/:id_Platform', getPlatformById);
router.post('/api/v1/platform', registerPlatform);
router.put('/api/v1/platform/:id_Platform', updatePlatform);
router.delete('/api/v1/platform/:id_Platform', delePlatform);

export default router