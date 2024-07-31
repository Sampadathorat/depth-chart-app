import { Request, Response } from 'express';
import { DepthChartService } from '../services/depthChartService';

const addPlayer =
    (service: DepthChartService) =>
    async (req: Request, res: Response): Promise<void> => {
        const { position, player, positionDepth } = req.body;
        await service.addPlayerToDepthChart(position, player, positionDepth);
        res.status(200).send('Player added');
    };

const getFullDepthChart =
    (service: DepthChartService) =>
    async (req: Request, res: Response): Promise<void> => {
        const { team } = req.query;
        if (typeof team !== 'string') {
            res.status(400).send('Invalid or missing team parameter');
            return;
        }
        try {
            await service.seed();
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 1);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 2);

            await service.addPlayerToDepthChart('LWR', 'MikeEvans', 0);
            await service.addPlayerToDepthChart('LWR', 'JaelonDarden', 1);
            await service.addPlayerToDepthChart('LWR', 'ScottMiller', 2);
            const result = await service.getFullDepthChart(team);
            console.log('^^^^ result', result);
            if (result) {
                res.render('depthChart', { team: result });
            } else {
                res.status(404).send('Team not found');
            }
        } catch (error) {
            console.trace('## ERROR', JSON.stringify(error));
            res.status(500).send('Oops! Something went wrong. Please contact our support team for troubleshooting');
        }
    };
export { addPlayer, getFullDepthChart };
