import { IName } from '../types/interfaces';

//** A player model that stores individual information for players, independent of the team they are associated with */
export interface IPlayer {
    alias: string;
    name: IName;
}
