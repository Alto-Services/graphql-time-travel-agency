import { getTravelerById } from './modules/traveler/model';
import { getBookingById } from './modules/booking/model';

export type Context = {
    getTravelerById: typeof getTravelerById;
    getBookingById: typeof getBookingById;
};

export const context = async (): Promise<Context> => {
    return {
        getTravelerById,
        getBookingById,
    };
};
