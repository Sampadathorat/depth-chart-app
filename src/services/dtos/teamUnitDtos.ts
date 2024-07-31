import { ITeamUnit } from '../../models/teamUnit';
import { INewPosition, IPositionDto } from './positionDtos';

export interface ITeamUnitDto extends ITeamUnit {
    positions?: IPositionDto[];
}

export interface INewTeamUnit extends Omit<ITeamUnit, 'units' | 'teamCode' | 'positions'> {
    positions?: INewPosition[];
}
