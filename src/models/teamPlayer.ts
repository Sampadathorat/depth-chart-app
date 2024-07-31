import { PlayerStatus } from '../types/enums';

export interface ITeamPlayer {
    teamPlayerNumber: number;
    playerAlias: string;
    teamCode: string;
    status: PlayerStatus;
    additionalInfo: string;
}
