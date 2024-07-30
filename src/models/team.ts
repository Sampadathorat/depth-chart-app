import { IName } from '../types/interfaces';
import { ITeamPlayer } from './teamPlayer';
import { INewTeamUnit, ITeamUnit } from './teamUnit';

export interface ITeam {
    code: string;
    sportCode: string;
    name: string;
    units?: ITeamUnit[];
    players?: ITeamPlayer[];
    offCordinator?: IName;
    defCordinator?: IName;
}

export interface INewTeam extends Omit<ITeam, 'units' | 'sportCode'> {
    units?: INewTeamUnit[];
}
