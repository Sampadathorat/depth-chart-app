import { ITrackingFields } from '../../../types/interfaces';

export interface IPositionEntity extends ITrackingFields {
    code: string;
    teamCode: string;
    teamUnitCode: string;
    name: string;
    maxDepth: number;
}
