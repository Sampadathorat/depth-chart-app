import { PlayerStatus } from '../../../types/enums';
import { ITrackingFields } from '../../../types/interfaces';

export interface ITeamPlayerEntity extends ITrackingFields {
    teamPlayerNumber: number;
    playerAlias: string;
    teamCode: string;
    status: PlayerStatus;
    additionalInfo: string;
}
