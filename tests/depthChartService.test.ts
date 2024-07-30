import { DepthChartService } from '../src/services/depthChartService';

import {
    DepthChartDataAccessService,
    IDepthChartDataAccessService,
} from '../src/services/dataAccess/depthChartDataAccessService';

class MockDepthChartDataAccessService implements IDepthChartDataAccessService {
    seed = jest.fn().mockResolvedValue(true);
    addPlayerToDepthChart = jest.fn().mockResolvedValue(true);
    removePlayerFromDepthChart = jest.fn().mockResolvedValue(true);
    getBackups = jest.fn().mockResolvedValue(true);
}

describe('DepthChartService', () => {
    let dataAccessMock: MockDepthChartDataAccessService;
    let service: DepthChartService;

    beforeEach(() => {
        dataAccessMock = new MockDepthChartDataAccessService();
        service = new DepthChartService(dataAccessMock as any);
    });

    describe('seed', () => {
        it('should call seed method on data access and return true', async () => {
            const result = await service.seed();
            expect(result).toBe(true);
            expect(dataAccessMock.seed).toHaveBeenCalledTimes(1);
        });
    });

    describe('addPlayerToDepthChart', () => {
        it('should call addPlayerToDepthChart method on data access with correct arguments and return true', async () => {
            const positionCode = 'QB';
            const playerAlias = 'John Doe';
            const depth = 1;

            const result = await service.addPlayerToDepthChart(positionCode, playerAlias, depth);
            expect(result).toBe(true);
            expect(dataAccessMock.addPlayerToDepthChart).toHaveBeenCalledWith(positionCode, playerAlias, depth);
            expect(dataAccessMock.addPlayerToDepthChart).toHaveBeenCalledTimes(1);
        });
    });
});
