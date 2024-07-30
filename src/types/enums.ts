export enum PlayerStatus {
    Injured = 'Injured',
    Inactive = 'Inactive',
    Rookie = 'Rookie',
    Starter = 'Starter',
}

export enum ResponseCodes {
    Processing = 1000,
    Success = 2000,
    Accepted = 2020,
    NoContent = 2040,
    BadRequest = 4000,
    Unauthorized = 4010,
    Forbidden = 4030,
    NotFound = 4040,
    MethodNotAllowed = 4050,
    Conflict = 4090,
    UnhandledError = 5000,
    ProcessingError = 5001,
    Unprocessable = 4220,
    RequestDenied = 9990,
}
