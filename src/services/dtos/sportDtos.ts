import { ISport } from '../../models/sport';
import { INewTeam, ITeamDto } from './teamDtos';

export interface ISportDto extends ISport {
    teams?: ITeamDto;
}

export interface INewSport extends Omit<ISport, 'teams'> {
    teams?: INewTeam;
}
