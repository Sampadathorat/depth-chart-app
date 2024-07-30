import { IPlayerPositionDepth } from './playerPositionDepth';
import { ITeamUnit } from './teamUnit';

export interface IDepthChart {
    id: string;
    units: ITeamUnit[];
}
