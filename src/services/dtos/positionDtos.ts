import { IPosition } from '../../models/position';
import { IPositionDepthDto } from './positionDepthDtos';

export interface IPositionDto extends IPosition {
    depths?: IPositionDepthDto[];
}
export interface INewPosition extends Omit<IPosition, 'teamCode' | 'teamUnitCode' | 'depths'> {}
