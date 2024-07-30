import { ResponseCodes } from '../types/enums';

export class ServiceException extends Error {
    public code: ResponseCodes;
    public methodName: string;

    constructor(code: ResponseCodes, msg: string, methodName: string = '', log: boolean = true) {
        super(msg);
        // Set the prototype to the ServiceException class
        Object.setPrototypeOf(this, ServiceException.prototype);
        this.code = code;
        this.name = 'ServiceException';
        this.methodName = methodName;
        if (log) {
            console.log(`### SERVICE EXCEPTION: ${methodName} : ${msg} ###`);
        }
    }
}
