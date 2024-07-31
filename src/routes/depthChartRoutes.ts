import { Router } from 'express';
import { addPlayer, getFullDepthChart } from '../controllers/depthChartController';
import { DepthChartService } from '../services/depthChartService';

const router = Router();
const depthChartService = new DepthChartService();
router.post('/addPlayer', addPlayer);
router.get('/depth-chart', getFullDepthChart(depthChartService));

export default router;
