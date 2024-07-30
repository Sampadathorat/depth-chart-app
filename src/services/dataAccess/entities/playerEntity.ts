import { IName, ITrackingFields } from '../../../types/interfaces';

export interface IPlayerEntity extends ITrackingFields {
    alias: string;
    name: IName;
}
