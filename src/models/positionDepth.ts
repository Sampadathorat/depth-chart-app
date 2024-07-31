/* The positionDepth object stores information about a player at a specific depth for a given position. 
When a player is added to the depth chart, a new record is created in this object  */
export interface IPositionDepth {
    id: string;
    playerAlias: string;
    teamCode: string;
    positionCode: string;
    depth: number;
}
