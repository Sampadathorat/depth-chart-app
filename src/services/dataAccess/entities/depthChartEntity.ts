import { ITrackingFields } from '../../../types/interfaces';
import { IPlayerPositionDepthEntity } from './playerPositionDepthEntity';

export interface IDepthChartEntity extends ITrackingFields {
    id: string;
    chartEntries: IPlayerPositionDepthEntity[];
}
