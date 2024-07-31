/*  The position model provides details of a position within a team unit. 
It is associated with a team unit, and the teamCode field is redundantly stored to simplify querying.
The maxDepth field specifies the maximum number of depths the position can have  */
export interface IPosition {
    code: string;
    teamCode: string;
    teamUnitCode: string;
    name: string;
    maxDepth: number;
}
