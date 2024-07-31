import { ResponseCodes } from '../types/enums';
import { DepthChartDataAccessService, IDepthChartDataAccessService } from './dataAccess/depthChartDataAccessService';
import { ServiceException } from './serviceException';
import { IPositionDto } from './dtos/positionDtos';
import { IPositionDepthDto } from './dtos/positionDepthDtos';
import { IPlayerDto } from './dtos/playerDtos';
import { ITeamDto } from './dtos/teamDtos';

export interface IDepthChartService {
    seed(): Promise<boolean>;
    addPlayerToDepthChart(positionCode: string, playerAlias: string, depth: number): Promise<IPositionDto | undefined>;
    removePlayerFromDepthChart(positionCode: string, playerAlias: string): Promise<IPlayerDto | undefined>;
    getFullDepthChart(teamCode: string): Promise<ITeamDto | undefined>;
    getBackups(positionCode: string, playerAlias: string): Promise<IPositionDepthDto[]>;
}
export class DepthChartService implements IDepthChartService {
    private readonly _dataAccess: IDepthChartDataAccessService;

    constructor(dataAccess = new DepthChartDataAccessService()) {
        this._dataAccess = dataAccess;
        console.debug(`## DepthChartService: constructor`);
    }

    async seed(): Promise<boolean> {
        console.debug(`## DepthChartService: seed`);
        return await this._dataAccess.seed();
    }

    async addPlayerToDepthChart(
        positionCode: string,
        playerAlias: string,
        depth: number
    ): Promise<IPositionDto | undefined> {
        const position = await this._dataAccess.getPosition(positionCode, false);
        console.debug(`## DepthChartService: addPlayerToDepthChart: position`, position);
        if (!position) {
            throw new ServiceException(ResponseCodes.BadRequest, `Invalid position code`);
        }
        const teamPlayer = this._dataAccess.getTeamPlayer(playerAlias, position.teamCode);
        if (!teamPlayer) {
            throw new ServiceException(
                ResponseCodes.ProcessingError,
                'The team player associated with the position could not be found. This may be due to a data configuration issue'
            );
        }
        if (depth > position.maxDepth) {
            throw new ServiceException(
                ResponseCodes.ProcessingError,
                `Invalid depth. The depth value should be less than ${position.maxDepth}`
            );
        }

        return await this._dataAccess.addPlayerToDepthChart(positionCode, playerAlias, depth);
    }

    async getFullDepthChart(teamCode: string): Promise<ITeamDto | undefined> {
        const team = await this._dataAccess.getTeam(teamCode);

        if (!team) {
            return undefined;
        }
        return team;
    }

    async getBackups(positionCode: string, playerAlias: string): Promise<IPositionDepthDto[]> {
        return await this._dataAccess.getBackups(positionCode, playerAlias);
    }
    async removePlayerFromDepthChart(positionCode: string, playerAlias: string): Promise<IPlayerDto | undefined> {
        return await this._dataAccess.removePlayerFromDepthChart(positionCode, playerAlias);
    }
}
