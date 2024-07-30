import { ITrackingFields } from '../../../types/interfaces';

export interface IPlayerPositionDepthEntity extends ITrackingFields {
    id: string;
    playerAlias: string;
    teamCode: string;
    positionCode: string;
    depth: number;
}
