import { IPlayerDepth } from './playerPositionDepth';

export interface IPosition {
    code: string;
    teamCode: string;
    teamUnitCode: string;
    name: string;
    maxDepth: number;
    depths?: IPlayerDepth[];
}

export interface INewPosition extends Omit<IPosition, 'teamCode' | 'teamUnitCode' | 'depths'> {}
