import { PlayerStatus } from '../types/enums';

/* To store information about a player within the team.The combination of playerAlias and teamCode serves as the unique identifier. 
A player will have a teamPlayerNumber assigned when they become part of the team
 */ export interface ITeamPlayer {
    teamPlayerNumber: number;
    playerAlias: string;
    teamCode: string;
    status: PlayerStatus;
    additionalInfo: string;
}
