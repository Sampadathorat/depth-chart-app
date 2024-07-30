export interface IPlayer {
    alias: string;
    firstName: string;
    lastName: string;
}

export interface INewPlayer extends Omit<IPlayer, 'id'> {}
