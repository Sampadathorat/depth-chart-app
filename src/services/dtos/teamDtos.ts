import { ITeam } from '../../models/team';
import { ITeamPlayerDto } from './teamPlayerDtos';
import { INewTeamUnit, ITeamUnitDto } from './teamUnitDtos';

export interface ITeamDto extends ITeam {
    units?: ITeamUnitDto[];
    players?: ITeamPlayerDto[];
}

export interface INewTeam extends Omit<ITeam, 'units' | 'sportCode'> {
    units?: INewTeamUnit[];
}
