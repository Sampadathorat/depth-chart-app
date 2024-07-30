export interface IHelper {
    newGUID(prefix?: string): string;
    convertDateToEpoch(inputDate: Date): number;
}
export class Helper implements IHelper {
    newGUID(prefix?: string): string {
        const { v4: uuidv4 } = require('uuid');
        if (!prefix) {
            return uuidv4();
        }
        return `${prefix}-${uuidv4()}`;
    }
    convertDateToEpoch(inputDate: Date): number {
        return Math.round(inputDate.getTime() / 1000); // getTime() always returns the UTC millisecons
    }
}
