import { DepthChartDataAccessService } from '../src/services/dataAccess/depthChartDataAccessService';
import { IHelper } from '../src/services/helper';
import { DepthChartDB } from '../src/services/dataAccess/inMemoryDb';

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
        it('should add a player to the depth chart at a given position', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);

            // Act
            const result = await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 2);

            // Assert
            expect(result?.depths?.length).toBe(1);
            const player = result?.depths ? result?.depths[0] : undefined;
            expect(player).not.toBeUndefined();
            expect(player?.depth).toBe(2);
            expect(player?.player?.playerAlias).toBe('BlaineGabbert');
        });
        it('adding a player without a depth would add them to the end of the depth chart at that position', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);

            // Act
            const result = await service.addPlayerToDepthChart('QB', 'KyleTrask');

            // Assert
            expect(result).not.toBeUndefined();
            const depths = result?.depths;
            expect(depths?.length).toBe(2);
            const playerTomBrady = result?.depths?.find((p) => p.player?.playerAlias === 'TomBrady');
            expect(playerTomBrady?.depth).toBe(0);
            const playerKyleTrask = result?.depths?.find((p) => p.player?.playerAlias === 'KyleTrask');
            expect(playerKyleTrask?.depth).toBe(1);
        });
        it('the new player should get priority. Anyone below that player in the depth chart would get moved down', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 1);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 2);

            // Act
            const result = await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 2);

            // Assert
            const BlaineGabbertPosition = result?.depths?.find((p) => p.player?.playerAlias === 'BlaineGabbert');
            expect(BlaineGabbertPosition).not.toBeUndefined();
            expect(BlaineGabbertPosition?.depth).toBe(2);

            const KyleTraskPosition = result?.depths?.find((p) => p.player?.playerAlias === 'KyleTrask');
            expect(KyleTraskPosition).not.toBeUndefined();
            expect(KyleTraskPosition?.depth).toBe(3);
        });

        it('should return undefined if position code is invalid', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);

            // Act
            const positionCode = 'INVALID_POSITION';
            const result = await service.addPlayerToDepthChart(positionCode, 'BlaineGabbert', 2);
            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('removePlayerFromDepthChart', () => {
        it('should remove a player from the depth chart for a given position and returns that player', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 0);

            // Act
            const result = await service.removePlayerFromDepthChart('QB', 'BlaineGabbert');

            // Assert
            expect(result?.alias).toBe('BlaineGabbert');
            const playerPosition = DepthChartDB.playersPositionDepth.find(
                (p) => p.playerAlias === 'BlaineGabbert' && p.positionCode === 'QB'
            );
            expect(playerPosition).toBeUndefined();
            expect(DepthChartDB.playersPositionDepth.length).toBe(0);
        });
        it('should return an empty list if the player is not listed in the depth chart at that position', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);

            // Act
            const result = await service.removePlayerFromDepthChart('QB', 'KyleTrask');

            // Assert
            expect(result).toBeUndefined();
        });

        it('should return empty list if position code is invalid', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);

            // Act
            const positionCode = 'INVALID_POSITION';
            const result = await service.removePlayerFromDepthChart(positionCode, 'BlaineGabbert');
            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('getBackups', () => {
        it('should return backup player with a lower depth', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 1);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 2);

            await service.addPlayerToDepthChart('LWR', 'MikeEvans', 0);
            await service.addPlayerToDepthChart('LWR', 'JaelonDarden', 1);
            await service.addPlayerToDepthChart('LWR', 'ScottMiller', 2);

            // Act
            const result1 = await service.getBackups('QB', 'TomBrady');
            const result2 = await service.getBackups('LWR', 'JaelonDarden');

            // Assert
            expect(result1).not.toBeUndefined();
            expect(result1.length).toEqual(2);
            expect(result1[0].depth).toBe(1);
            expect(result1[0].player?.teamPlayerNumber).toBe(11);
            expect(result1[1].depth).toBe(2);
            expect(result1[1].player?.teamPlayerNumber).toBe(2);

            expect(result2.length).toEqual(1);
            expect(result2[0].depth).toBe(2);
            expect(result2[0].player?.teamPlayerNumber).toBe(10);
        });
        it('An empty list should be returned if the given player has no Backups', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 1);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 2);

            // Act
            const result = await service.getBackups('QB', 'KyleTrask');

            // Assert
            expect(result).not.toBeUndefined();
            expect(result.length).toEqual(0);
        });
        it('An empty list should be returned if the given player if the given player is not listed in the depth chart at that position', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 0);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 1);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 2);

            // Act
            const result = await service.getBackups('QB', 'MikeEvans');

            // Assert
            expect(result).not.toBeUndefined();
            expect(result.length).toEqual(0);
        });
        it('should return empty list if position code is invalid', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 1);

            // Act
            const positionCode = 'INVALID_POSITION';
            const result = await service.getBackups(positionCode, 'MikeEvans');

            // Assert
            expect(result).not.toBeUndefined();
            expect(result.length).toEqual(0);
        });
    });
    describe('getFullDepthChart', () => {
        it('should return team with position depth correctly', async () => {
            // Arrange
            DepthChartDB.Seed(1722301952);
            await service.addPlayerToDepthChart('QB', 'TomBrady', 1);
            await service.addPlayerToDepthChart('QB', 'BlaineGabbert', 2);
            await service.addPlayerToDepthChart('QB', 'KyleTrask', 3);

            await service.addPlayerToDepthChart('LWR', 'MikeEvans', 1);
            await service.addPlayerToDepthChart('LWR', 'JaelonDarden', 2);
            await service.addPlayerToDepthChart('LWR', 'ScottMiller', 3);

            await service.removePlayerFromDepthChart('WR', 'MikeEvans');

            // Act
            const result = await service.getTeam('TBB');

            // Assert
            expect(result).not.toBeUndefined();
            expect(result?.units?.length).toEqual(1);
            const unit = result?.units?.find((p) => p.code === 'OFFEN');
            expect(unit).not.toBeUndefined();
            const qbPosition = unit?.positions?.find((p) => p.code === 'QB');
            expect(qbPosition).not.toBeUndefined();
            expect(qbPosition?.depths?.length).toBe(3);
            const lwrPosition = unit?.positions?.find((p) => p.code === 'LWR');
            expect(lwrPosition).not.toBeUndefined();
            expect(lwrPosition?.depths?.length).toBe(3);
        });
    });
});
