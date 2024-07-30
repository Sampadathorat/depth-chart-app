import { DepthChartDataAccessService } from '../src/services/dataAccess/depthChartDataAccessService';
import { IHelper } from '../src/services/helper';
import { DepthChartDB } from '../src/services/dataAccess/inMemoryDb';
import { ServiceException } from '../src/services/serviceException';
import { ResponseCodes } from '../src/types/enums';


describe('DepthChartDataAccessService', () => {
    let service: DepthChartDataAccessService;
    let mockHelper: jest.Mocked<IHelper>;

    beforeEach(() => {
      mockHelper = {
      newGUID: jest.fn((prefix?: string) => (prefix ? `${prefix}-mock-uuid` : 'mock-uuid')),
      convertDateToEpoch: jest.fn((inputDate: Date) => Math.round(inputDate.getTime() / 1000)),
    };
    service = new DepthChartDataAccessService(mockHelper as any);
    // Clear the in-memory database before each test
      DepthChartDB.Truncate();
      
  });

  describe('seed', () => {
    it('should seed the DepthChartDB with the current date', async () => {
      const result = await service.seed();
      expect(result).toBe(true);
      expect(DepthChartDB.isSeeded()).toBe(true); // Implement isSeeded() in your DepthChartDB
    });
  });

  describe('addPlayerToDepthChart', () => {
    it('should add a player to the depth chart successfully', async () => {
      // Arrange
      DepthChartDB.Seed(1722301952); 
      
      const positionCode = 'LT';
      const playerAlias = 'YayaD';
      const depth = 1;

      // Act
      const result = await service.addPlayerToDepthChart(positionCode, playerAlias, depth);

      // Assert
      expect(result).toBe(true);
      const playerPosition = DepthChartDB.playersPositionDepth.find(ppd => ppd.playerAlias === playerAlias);
      expect(playerPosition).not.toBeUndefined();
      expect(playerPosition?.depth).toBe(depth);
    });

    it('should throw an error if position code is invalid', async () => {
      // Arrange
       DepthChartDB.Seed(1722301952); 

      const positionCode = 'INVALID_POSITION';
      const playerAlias = 'YayaD';
      const depth = 1;

      // Act & Assert
      await expect(service.addPlayerToDepthChart(positionCode, playerAlias, depth))
        .rejects
        .toThrowError(new ServiceException(ResponseCodes.BadRequest, 'Invalid position code'));
    });

    
  });

 

  
});
