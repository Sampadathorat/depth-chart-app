import { INewPosition, IPosition } from './position';

export interface ITeamUnit {
    code: string;
    teamCode: string;
    name: string;
    positions?: IPosition[];
}

export interface INewTeamUnit extends Omit<ITeamUnit, 'units' | 'teamCode' | 'positions'> {
    positions?: INewPosition[];
}
