import { IPlayerDto } from '../dtos/playerDtos';
import { IPositionDepthDto } from '../dtos/positionDepthDtos';
import { IPositionDto } from '../dtos/positionDtos';
import { ITeamDto } from '../dtos/teamDtos';
import { ITeamPlayerDto } from '../dtos/teamPlayerDtos';
import { ITeamUnitDto } from '../dtos/teamUnitDtos';
import { Helper, IHelper } from '../helper';
import { IPlayerPositionDepthEntity } from './entities/playerPositionDepthEntity';
import { IPositionEntity } from './entities/positionEntity';
import { DepthChartDB } from './inMemoryDb';

export interface IDepthChartDataAccessService {
    seed(): Promise<boolean>;
    addPlayerToDepthChart(positionCode: string, playerAlias: string, depth?: number): Promise<IPositionDto | undefined>;
    removePlayerFromDepthChart(positionCode: string, playerAlias: string): Promise<IPlayerDto | undefined>;
    getBackups(positionCode: string, playerAlias: string): Promise<IPositionDepthDto[]>;
    getTeam(teamCode: string, includeUnits?: boolean): Promise<ITeamDto | undefined>;
    getTeamUnits(teamCode: string, excludeUnitsWithEmptyPositions?: boolean): Promise<ITeamUnitDto[]>;
    getPosition(positionCode: string, includeDepths?: boolean): Promise<IPositionDto | undefined>;
    getPositions(
        teamUnitCode: string,
        includeDepths?: boolean,
        excludePositionsWithEmptyDepths?: boolean
    ): Promise<IPositionDto[]>;
    getPositionDepths(positionCode: string): Promise<IPositionDepthDto[]>;
    getTeamPlayer(playerAlias: string, teamCode: string): Promise<ITeamPlayerDto | undefined>;
    getPlayer(playerAlias: string): Promise<IPlayerDto | undefined>;
}
export class DepthChartDataAccessService implements IDepthChartDataAccessService {
    private readonly _currentDate: number;
    private readonly _helper: IHelper;
    constructor(helper = new Helper()) {
        this._helper = helper;
        this._currentDate = helper.convertDateToEpoch(new Date());

        console.debug(`## DepthChartDataAccessService: constructor`, this._currentDate);
    }

    async seed(): Promise<boolean> {
        const currentDate = this._currentDate;
        DepthChartDB.Seed(currentDate);
        return true;
    }
    async addPlayerToDepthChart(
        positionCode: string,
        playerAlias: string,
        depth?: number
    ): Promise<IPositionDto | undefined> {
        const position = DepthChartDB.positions.find((p) => p.code === positionCode);

        if (!position) {
            console.debug('## addPlayerToDepthChart: invalid position code ##', positionCode);
            return undefined;
        }

        // The added player would get priority. Anyone below that player in the depth chart would get moved down a depth
        if (depth !== undefined) {
            await this.freeUpPositionDepths(positionCode, depth);
        }
        // Adding a player without a depth would add them to the end of the depth chart at that position
        const posDepth = depth !== undefined ? depth : await this.getEndOfTheDepth(positionCode);

        const playerPositionDepth: IPlayerPositionDepthEntity = {
            id: this._helper.newGUID('ppd'),
            playerAlias: playerAlias,
            teamCode: position.teamCode,
            positionCode: positionCode,
            depth: posDepth,
            createdDate: this._currentDate,
            updatedDate: this._currentDate,
        };

        DepthChartDB.playersPositionDepth.push(playerPositionDepth);

        const updatedPosition = await this.getPosition(positionCode, true);
        return updatedPosition;
    }

    async getEndOfTheDepth(positionCode: string): Promise<number> {
        const depths: IPositionDepthDto[] = DepthChartDB.playersPositionDepth.filter(
            (p) => p.positionCode === positionCode
        );

        if (depths.length === 0) {
            return 0;
        }
        const maxDepth = depths.reduce((maxDepth, position) => {
            return position.depth > maxDepth ? position.depth : maxDepth;
        }, depths[0].depth);
        return maxDepth + 1;
    }

    async freeUpPositionDepths(positionCode: string, depth: number): Promise<boolean> {
        DepthChartDB.playersPositionDepth.forEach((p) => {
            if (p.positionCode === positionCode && p.depth >= depth) {
                p.depth += 1;
            }
        });
        return true;
    }

    async adjustExistingDepths(positionCode: string, depth: number): Promise<boolean> {
        DepthChartDB.playersPositionDepth.forEach((p) => {
            if (p.positionCode === positionCode && p.depth >= depth && p.depth !== 0) {
                p.depth -= 1;
            }
        });
        return true;
    }
    async removePlayerFromDepthChart(positionCode: string, playerAlias: string): Promise<IPlayerDto | undefined> {
        const position = DepthChartDB.playersPositionDepth.find(
            (p) => p.positionCode === positionCode && p.playerAlias === playerAlias
        );
        if (!position) {
            return undefined;
        }
        const index = DepthChartDB.playersPositionDepth.indexOf(position);
        DepthChartDB.playersPositionDepth.splice(index, 1);

        await this.adjustExistingDepths(positionCode, position.depth);
        const updatedPosition = await this.getPlayer(playerAlias);
        return updatedPosition;
    }
    async getBackups(positionCode: string, playerAlias: string): Promise<IPositionDepthDto[]> {
        const position = DepthChartDB.playersPositionDepth.find(
            (p) => p.positionCode === positionCode && p.playerAlias === playerAlias
        );

        if (!position) {
            return [];
        }
        const depths = await this.getPositionDepths(positionCode);
        return depths.filter((p) => p.depth > position.depth);
    }

    async getTeam(teamCode: string, includeUnits: boolean = true): Promise<ITeamDto | undefined> {
        const team = await DepthChartDB.teams.find((p) => p.code === teamCode);
        if (!team) {
            console.debug(`## getTeam: team not found for code ${teamCode} ##`);
            return undefined;
        }
        const teamUnits = includeUnits === true ? await this.getTeamUnits(teamCode) : [];
        return {
            code: team.code,
            sportCode: team.sportCode,
            name: team.name,
            units: teamUnits,
            offCordinator: team.offCordinator,
            defCordinator: team.defCordinator,
        };
    }

    async getTeamUnits(teamCode: string, excludeUnitsWithEmptyPositions: boolean = true): Promise<ITeamUnitDto[]> {
        const units = DepthChartDB.teamUnits.filter((p) => p.teamCode === teamCode);
        const teamUnits: ITeamUnitDto[] = [];
        for (let index = 0; index < units.length; index++) {
            const element = units[index];
            const positions = await this.getPositions(element.code, true);
            if (excludeUnitsWithEmptyPositions === true && positions.length === 0) {
                continue;
            }
            const unit: ITeamUnitDto = {
                code: element.code,
                teamCode: element.teamCode,
                name: element.name,
                positions: positions,
            };
            teamUnits.push(unit);
        }
        return teamUnits;
    }

    async getPosition(positionCode: string, includeDepths: boolean = true): Promise<IPositionDto | undefined> {
        const position = DepthChartDB.positions.find((p) => p.code === positionCode);

        if (!position) {
            return undefined;
        }
        return await this.buildPositionDto(position, includeDepths, false);
    }

    async getPositions(
        teamUnitCode: string,
        includeDepths: boolean = true,
        excludePositionsWithEmptyDepths: boolean = true
    ): Promise<IPositionDto[]> {
        const positions = DepthChartDB.positions.filter((p) => p.teamUnitCode === teamUnitCode);
        const depthPositions: IPositionDto[] = [];
        for (let index = 0; index < positions.length; index++) {
            const pos = positions[index];
            const position: IPositionDto | undefined = await this.buildPositionDto(
                pos,
                includeDepths,
                excludePositionsWithEmptyDepths
            );
            if (position) {
                depthPositions.push(position);
            }
        }
        return depthPositions;
    }

    private async buildPositionDto(
        position: IPositionEntity,
        includeDepths: boolean = true,
        excludePositionsWithEmptyDepths: boolean = true
    ): Promise<IPositionDto | undefined> {
        const depths: IPositionDepthDto[] = includeDepths === true ? await this.getPositionDepths(position.code) : [];

        if (excludePositionsWithEmptyDepths === true && depths.length === 0) {
            return undefined;
        }

        return {
            code: position.code,
            teamCode: position.teamCode,
            teamUnitCode: position.teamUnitCode,
            name: position.name,
            maxDepth: position.maxDepth,
            depths: depths,
        };
    }

    async getPositionDepths(positionCode: string): Promise<IPositionDepthDto[]> {
        const depths = await DepthChartDB.playersPositionDepth.filter((p) => p.positionCode === positionCode);
        const playerDepths: IPositionDepthDto[] = [];
        for (let index = 0; index < depths.length; index++) {
            const depthPlayer = depths[index];
            const teamPlayer = await this.getTeamPlayer(depthPlayer.playerAlias, depthPlayer.teamCode);
            if (!teamPlayer) {
                continue;
            }
            const playerDepth = {
                depth: depthPlayer.depth,
                player: teamPlayer,
            };
            playerDepths.push(playerDepth);
        }
        return playerDepths;
    }
    async getPlayer(playerAlias: string): Promise<IPlayerDto | undefined> {
        const data = await DepthChartDB.players.find((p) => p.alias === playerAlias);
        if (!data) {
            return undefined;
        }
        return data as IPlayerDto;
    }

    async getTeamPlayer(playerAlias: string, teamCode: string): Promise<ITeamPlayerDto | undefined> {
        const teamPlayer = await DepthChartDB.teamPlayers.find(
            (p) => p.playerAlias === playerAlias && p.teamCode === teamCode
        );
        const player = await DepthChartDB.players.find((p) => p.alias === playerAlias);
        if (!teamPlayer || !player) {
            return undefined;
        }
        return {
            teamPlayerNumber: teamPlayer.teamPlayerNumber,
            playerAlias: teamPlayer.playerAlias,
            status: teamPlayer.status,
            additionalInfo: teamPlayer.additionalInfo,
            name: player.name,
        };
    }
}
