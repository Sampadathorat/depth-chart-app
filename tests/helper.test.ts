import { Helper, IHelper } from '../src/services/helper';

describe('Helper', () => {
    let helper: IHelper;

    beforeEach(() => {
        helper = new Helper();
    });

    describe('convertDateToEpoch', () => {
        it('should convert date to epoch time in seconds', () => {
            const date = new Date('2024-07-31T00:00:00Z');
            const epochTime = Math.round(date.getTime() / 1000);

            const result = helper.convertDateToEpoch(date);

            expect(result).toBe(epochTime);
        });

        it('should handle different date inputs', () => {
            const dates = [
                new Date('1970-01-01T00:00:00Z'),
                new Date('2000-01-01T00:00:00Z'),
                new Date('2024-07-31T00:00:00Z'),
            ];

            dates.forEach((date) => {
                const epochTime = Math.round(date.getTime() / 1000);
                const result = helper.convertDateToEpoch(date);
                expect(result).toBe(epochTime);
            });
        });
    });
});
