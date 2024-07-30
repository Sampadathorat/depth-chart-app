import { PlayerStatus } from '../types/enums';
import { IPlayer } from './player';

export interface ITeamPlayer {
    playerAlias: string;
    teamCode: string;
    teamPlayerNumber: number;
    status: PlayerStatus;
    additionalInfo: string;
    player?: IPlayer;
}

export interface INewTeamPlayer extends Omit<ITeamPlayer, 'player'> {}
