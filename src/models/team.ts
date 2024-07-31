import { IName } from '../types/interfaces';

export interface ITeam {
    code: string;
    sportCode: string;
    name: string;
    headCoach?: IName;
    offCordinator?: IName;
    defCordinator?: IName;
}
