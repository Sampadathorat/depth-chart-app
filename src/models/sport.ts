import { INewTeam, ITeam } from './team';

export interface ISport {
    code: string;
    name: string;
    teams?: ITeam;
}

export interface INewSport extends Omit<ISport, 'teams'> {
    teams?: INewTeam;
}
