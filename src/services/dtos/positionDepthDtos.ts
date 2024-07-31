import { IPlayer } from '../../models/player';
import { IPositionDepth } from '../../models/positionDepth';
import { ITeamPlayerDto } from './teamPlayerDtos';

export interface IPositionDepthDto extends Pick<IPositionDepth, 'depth'> {
    player?: ITeamPlayerDto;
}
export interface INewPositionDepth extends Omit<IPositionDepth, 'id' | 'teamCode'> {}
