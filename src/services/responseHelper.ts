import { ResponseCodes } from '../types/enums';
import { IServiceReturn, ServiceResponse } from '../types/interfaces';
import { ServiceException } from './serviceException';

export interface IResponseHelpers {
    sucessResponse(data?: any): IServiceReturn;
    customResponse(code: ResponseCodes, message: string): IServiceReturn;
    errorResponse(error?: Error, log?: boolean, overrideMessage?: boolean): IServiceReturn;
}

export class ResponseHelpers implements IResponseHelpers {
    private readonly _version: string | undefined;
    constructor(version?: string) {
        this._version = version ? version : '1.0.0';
    }

    //Returns
    sucessResponse(data: any = undefined): IServiceReturn {
        const message: string = 'The request has succeeded';
        console.info(message);
        const sResponse = this.buildResponse(ResponseCodes.Success, message, data);
        return this.serviceReturn(200, sResponse);
    }

    customResponse(code: ResponseCodes, message: string): IServiceReturn {
        try {
            const logError: string = `Custom message: ${message}`;
            console.error(logError);
            let returnError: string = logError;

            const sResponse = this.buildResponse(code, returnError);
            console.log('scResponse', sResponse);
            const returnCode = Math.floor(+sResponse.serviceResponse.code / 10);

            return this.serviceReturn(returnCode, sResponse);
        } catch (error) {
            console.log('Error from customResponse', error);
            return {
                statusCode: 400,
                body: JSON.stringify(message),
            };
        }
    }

    errorResponse(error?: Error, log: boolean = true, overrideMessage: boolean = true): IServiceReturn {
        try {
            const logError: string = `Error: ${JSON.stringify(error)}`;
            if (log) {
                console.error(logError);
            }

            let code = ResponseCodes.UnhandledError;
            let returnError: string = logError;

            if (error instanceof ServiceException) {
                code = error.code;
                returnError = error.message;
            } else {
                if (overrideMessage) {
                    returnError = 'Oops! Something went wrong. Please contact our support team for troubleshooting';
                }
            }

            const sResponse = this.buildResponse(code, returnError);
            const returnCode = Math.floor(+sResponse.serviceResponse.code / 10);
            return this.serviceReturn(returnCode, sResponse);
        } catch (error) {
            console.error('error from errorResponse', error);
            return {
                statusCode: 500,
                body: JSON.stringify('Oops! Something went wrong. Please contact our support team for troubleshooting'),
            };
        }
    }

    private serviceReturn(statusCode: number, data: ServiceResponse): IServiceReturn {
        return {
            statusCode: statusCode,
            body: JSON.stringify(data),
        };
    }

    private buildResponse(code: ResponseCodes, message: string, data: any = undefined): ServiceResponse {
        return {
            serviceResponse: {
                code: code,
                message: message,
                data: data,
                version: this._version,
            },
        };
    }
}
