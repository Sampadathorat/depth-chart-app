import { IName, ITrackingFields } from '../../../types/interfaces';

export interface ITeamEntity extends ITrackingFields {
    code: string;
    sportCode: string;
    name: string;
    headCoach?: IName;
    offCordinator?: IName;
    defCordinator?: IName;
}
