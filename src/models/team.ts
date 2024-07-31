import { IName } from '../types/interfaces';

//** A team model for storing team information. Each team is associated with a sport, and the code serves as the unique identifier */
export interface ITeam {
    code: string;
    sportCode: string;
    name: string;
    headCoach?: IName;
    offCordinator?: IName;
    defCordinator?: IName;
}
