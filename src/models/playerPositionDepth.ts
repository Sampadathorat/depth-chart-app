import { IPlayer } from './player';

export interface IPlayerPositionDepth {
    id: string;
    playerAlias: string;
    teamCode: string;
    positionCode: string;
    depth: number;
    player?: IPlayer;
}

export interface INewPlayerPositionDepth
    extends Omit<IPlayerPositionDepth, 'id' | 'teamCode' | 'teamUnitCode' | 'player'> {}

export interface IPlayerDepth extends Pick<IPlayerPositionDepth, 'id' | 'depth' | 'player'> {}
