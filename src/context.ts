import { getTravelerById } from './modules/traveler/model';
import { getBookingById } from './modules/booking/model';
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
