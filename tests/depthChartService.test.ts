import { DepthChartService, IDepthChartService } from '../src/services/depthChartService';
import { DepthChartDataAccessService } from '../src/services/dataAccess/depthChartDataAccessService';
import { ServiceException } from '../src/services/serviceException';
import { PlayerStatus, ResponseCodes } from '../src/types/enums';
import { IPositionDto } from '../src/services/dtos/positionDtos';
import { ITeamPlayerDto } from '../src/services/dtos/teamPlayerDtos';
import { ITeamDto } from '../src/services/dtos/teamDtos';
import { IPositionDepthDto } from '../src/services/dtos/positionDepthDtos';
import { IPlayerDto } from '../src/services/dtos/playerDtos';

jest.mock('../src/services/dataAccess/depthChartDataAccessService');

describe('DepthChartService', () => {
    let depthChartService: IDepthChartService;
    let mockDataAccess: jest.Mocked<DepthChartDataAccessService>;

    beforeEach(() => {
        mockDataAccess = new DepthChartDataAccessService() as jest.Mocked<DepthChartDataAccessService>;
        depthChartService = new DepthChartService(mockDataAccess);
    });

    describe('addPlayerToDepthChart', () => {
        it('should add player to depth chart', async () => {
            const position = { teamCode: 'TBB', maxDepth: 5 } as IPositionDto;
            const player = {
                teamPlayerNumber: 10,
                status: PlayerStatus.Starter,
                additionalInfo: 'CF24',
                name: { firstName: 'Scott', lastName: 'Miller' },
            } as ITeamPlayerDto;
            mockDataAccess.getPosition.mockResolvedValue(position);
            mockDataAccess.getTeamPlayer.mockResolvedValue(player);
            mockDataAccess.addPlayerToDepthChart.mockResolvedValue(position);

            const result = await depthChartService.addPlayerToDepthChart('QB', 'ScottMiller', 2);

            expect(result).toBe(position);
            expect(mockDataAccess.getPosition).toHaveBeenCalledWith('QB', false);
            expect(mockDataAccess.getTeamPlayer).toHaveBeenCalledWith('ScottMiller', 'TBB');
            expect(mockDataAccess.addPlayerToDepthChart).toHaveBeenCalledWith('QB', 'ScottMiller', 2);
        });

        it('should throw error if position is invalid', async () => {
            mockDataAccess.getPosition.mockResolvedValue(undefined);

            await expect(depthChartService.addPlayerToDepthChart('invalid', 'ScottMiller', 2)).rejects.toThrow(
                new ServiceException(ResponseCodes.BadRequest, 'Invalid position code')
            );
        });
    });

    describe('getFullDepthChart', () => {
        it('should return full depth chart for team', async () => {
            const team: ITeamDto = {
                code: 'TBB',
                sportCode: 'NFL',
                name: 'Tampa Bay Buccaneers',
                units: [
                    {
                        code: 'OFFEN',
                        teamCode: 'TBB',
                        name: 'Offense',
                        positions: [
                            {
                                code: 'LWR',
                                teamCode: 'TBB',
                                teamUnitCode: 'OFFEN',
                                name: 'Left Wide Receiver',
                                maxDepth: 5,
                                depths: [
                                    {
                                        depth: 1,
                                        player: {
                                            teamPlayerNumber: 13,
                                            playerAlias: 'MikeEvans',
                                            status: PlayerStatus.Starter,
                                            additionalInfo: '17/3',
                                            name: {
                                                lastName: 'Evans',
                                                firstName: 'Mike',
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                offCordinator: {
                    firstName: 'Byron',
                    lastName: 'Leftwich',
                },
                defCordinator: {
                    firstName: 'Todd',
                    lastName: 'Bowles',
                },
            };
            mockDataAccess.getTeam.mockResolvedValue(team);

            const result = await depthChartService.getFullDepthChart('TBB');

            expect(result).toBe(team);
            expect(mockDataAccess.getTeam).toHaveBeenCalledWith('TBB');
        });

        it('should return undefined if team is not found', async () => {
            mockDataAccess.getTeam.mockResolvedValue(undefined);

            const result = await depthChartService.getFullDepthChart('invalid');

            expect(result).toBeUndefined();
        });
    });

    describe('getBackups', () => {
        it('should return backups for position and player', async () => {
            const backups: IPositionDepthDto[] = [
                {
                    depth: 1,
                    player: {
                        teamPlayerNumber: 2,
                        playerAlias: 'KyleTrask',
                        status: PlayerStatus.Starter,
                        additionalInfo: '22/3',
                        name: {
                            lastName: 'Trask',
                            firstName: 'Kyle"',
                        },
                    },
                },
            ];
            mockDataAccess.getBackups.mockResolvedValue(backups);

            const result = await depthChartService.getBackups('QB', 'KyleTrask');

            expect(result).toBe(backups);
            expect(mockDataAccess.getBackups).toHaveBeenCalledWith('QB', 'KyleTrask');
        });
    });

    describe('removePlayerFromDepthChart', () => {
        it('should remove player from depth chart', async () => {
            const player = { alias: 'KyleTrask' } as IPlayerDto;
            mockDataAccess.removePlayerFromDepthChart.mockResolvedValue(player);

            const result = await depthChartService.removePlayerFromDepthChart('QB', 'KyleTrask');

            expect(result).toBe(player);
            expect(mockDataAccess.removePlayerFromDepthChart).toHaveBeenCalledWith('QB', 'KyleTrask');
        });

        it('should return undefined if player is not in depth chart', async () => {
            mockDataAccess.removePlayerFromDepthChart.mockResolvedValue(undefined);

            const result = await depthChartService.removePlayerFromDepthChart('QB', 'invalid');

            expect(result).toBeUndefined();
        });
    });
});
