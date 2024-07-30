import { Request, Response } from 'express';
import { addPlayer } from '../src/controllers/depthChartController';
import { DepthChartService } from '../src/services/depthChartService';

describe('addPlayer', () => {
    it('should add a player to the depth chart', async () => {
        // Create a mock service
        const mockService = {
            addPlayerToDepthChart: jest.fn().mockResolvedValue(undefined),
        } as unknown as DepthChartService;

        // Mock request and response objects
        const req = {
            body: {
                position: 'QB',
                player: 'John Doe',
                positionDepth: 1,
            },
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        // Call the controller with the mock service
        const controller = addPlayer(mockService);
        await controller(req, res);

        // Verify the service method was called correctly
        expect(mockService.addPlayerToDepthChart).toHaveBeenCalledWith('QB', 'John Doe', 1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Player added');
    });
});
