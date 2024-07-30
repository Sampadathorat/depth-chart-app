import { ResponseCodes } from '../../types/enums';
import { Helper, IHelper } from '../helper';
import { ServiceException } from '../serviceException';
import { IPlayerPositionDepthEntity } from './entities/playerPositionDepthEntity';
import { DepthChartDB } from './inMemoryDb';

export interface IDepthChartDataAccessService {
    seed(): Promise<boolean>;
    addPlayerToDepthChart(positionCode: string, playerAlias: string, depth: number): Promise<boolean>;
}
export class DepthChartDataAccessService implements IDepthChartDataAccessService {
    private readonly _currentDate: number;
    private readonly _helper: IHelper;
    constructor(helper = new Helper()) {
        this._helper = helper;
        this._currentDate = helper.convertDateToEpoch(new Date());
    }

    async seed(): Promise<boolean> {
        const currentDate = this._currentDate;
        DepthChartDB.Seed(currentDate);
        return true;
    }
    async addPlayerToDepthChart(positionCode: string, playerAlias: string, depth: number): Promise<boolean> {
        const position = DepthChartDB.positions.find((p) => p.code === positionCode);
        if (!position) {
            throw new ServiceException(ResponseCodes.BadRequest, 'Invalid position code');
        }
        const team = DepthChartDB.teams.find((p) => p.code === position.teamCode);
        if (!team) {
            throw new ServiceException(
                ResponseCodes.ProcessingError,
                'The team associated with the position could not be found. This may be due to a data configuration issue'
            );
        }
        if (depth > position.maxDepth) {
            throw new ServiceException(
                ResponseCodes.ProcessingError,
                `Invalid depth. The depth value should be less than ${position.maxDepth}`
            );
        }
        const player = DepthChartDB.players.find((p) => p.alias === playerAlias);
        if (!player) {
            throw new ServiceException(ResponseCodes.BadRequest, 'Invalid player alias');
        }
        const teamPlayer = DepthChartDB.teamPlayers.find(
            (p) => p.playerAlias === playerAlias && p.teamCode === position.teamCode
        );
        if (!teamPlayer) {
            throw new ServiceException(
                ResponseCodes.BadRequest,
                'The player is not associated with the team corresponding to the specified positionCode'
            );
        }

        const playerPositionDepth: IPlayerPositionDepthEntity = {
            id: this._helper.newGUID('ppd'),
            playerAlias: playerAlias,
            teamCode: teamPlayer?.teamCode,
            positionCode: positionCode,
            depth: depth,
            createdDate: this._currentDate,
            updatedDate: this._currentDate,
        };
        DepthChartDB.playersPositionDepth.push(playerPositionDepth);
        return true;
    }

    async removePlayerFromDepthChart(positionCode: string, playerAlias: string): Promise<boolean> {
        const position = DepthChartDB.playersPositionDepth.find(
            (p) => p.positionCode === positionCode && playerAlias === playerAlias
        );
        if (!position) {
            throw new ServiceException(ResponseCodes.BadRequest, 'Invalid position code or playerAlias');
        }
        const index = DepthChartDB.playersPositionDepth.indexOf(position);
        DepthChartDB.playersPositionDepth.splice(index, 1);

        // // Filter out the player with the specified depth
        // const filteredArray = arr.filter((player) => player.depth !== depthToRemove);

        // // Update the depth of the remaining players to retain the sequence
        // const updatedArray = filteredArray.map((player, index) => ({
        //     ...player,
        //     depth: index + 1,
        // }));
        return true;
    }
    async getBackups(positionCode: string, playerAlias: string): Promise<boolean> {
        return true;
    }
}
