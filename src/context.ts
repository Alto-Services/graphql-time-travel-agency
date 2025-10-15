import { getTravelerById } from './modules/traveler/datasource';
import { getBookingById } from './modules/booking/datasource';
import { IncomingMessage } from 'http';

export type Context = {
    getTravelerById: typeof getTravelerById;
    getBookingById: typeof getBookingById;
};

export const context = async ({ req }: { req: IncomingMessage }): Promise<Context> => {
    return {
        getTravelerById,
        getBookingById,
    };
};
