import { Request, Response } from 'express';
import { DepthChartService } from '../services/depthChartService';

const addPlayer =
    (service: DepthChartService) =>
    async (req: Request, res: Response): Promise<void> => {
        const { position, player, positionDepth } = req.body;
        await service.addPlayerToDepthChart(position, player, positionDepth);
        res.status(200).send('Player added');
    };

export { addPlayer };
