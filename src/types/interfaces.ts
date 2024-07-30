import { ResponseCodes } from './enums';

export interface IServiceReturn {
    statusCode: number;
    body: string;
}

export interface IName {
    firstName: string;
    lastName: string;
}

export interface ITrackingFields {
    createdDate: number;
    updatedDate: number;
    correlationInfo?: string;
}

export interface ServiceResponse {
    serviceResponse: {
        code: ResponseCodes;
        message: string;
        version?: string;
        data?: any;
    };
}
