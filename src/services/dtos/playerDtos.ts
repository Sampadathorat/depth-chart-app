import { IPlayer } from '../../models/player';

export interface IPlayerDto extends IPlayer {}

export interface INewPlayer extends Omit<IPlayer, 'alias'> {}
