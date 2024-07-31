import { IPlayer } from '../../models/player';
import { ITeamPlayer } from '../../models/teamPlayer';
import { IName } from '../../types/interfaces';

export interface ITeamPlayerDto extends Omit<ITeamPlayer, 'teamCode'> {
    name: IName;
}

export interface INewTeamPlayer extends Omit<ITeamPlayer, 'player'> {}
