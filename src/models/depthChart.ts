import { IPositionDepth } from './positionDepth';

//** This model is intended for storing depth chart snapshots, but it is not currently utilized in the solution  */
export interface IDepthChart {
    id: string;
    chartEntries: IPositionDepth[];
}
