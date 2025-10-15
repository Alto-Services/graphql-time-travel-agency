import { getTravelerById } from './modules/traveler/datasource';
import { getBookingById } from './modules/booking/datasource';
import { getTimePeriodById } from './modules/timePeriod/datasource';
import { IncomingMessage } from 'http';

export type Context = {
    getTravelerById: typeof getTravelerById;
    getBookingById: typeof getBookingById;
    getTimePeriodById: typeof getTimePeriodById;
};

export const context = async ({ req }: { req: IncomingMessage }): Promise<Context> => {
    return {
        getTravelerById,
        getBookingById,
        getTimePeriodById,
    };
};
