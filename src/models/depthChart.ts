import { IPositionDepth } from './positionDepth';

export interface IDepthChart {
    id: string;
    chartEntries: IPositionDepth[];
}
