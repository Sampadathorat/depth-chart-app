import { Router } from 'express';
import { addPlayer } from '../controllers/depthChartController';

const router = Router();

router.post('/addPlayer', addPlayer);
// router.post('/removePlayer', removePlayer);
// router.post('/getBackups', getBackupsList);

export default router;
