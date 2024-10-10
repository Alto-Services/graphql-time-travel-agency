import { getTravelerById } from './modules/traveler/model';
import { getBookingById } from './modules/booking/model';
import {getTimePeriodById} from './modules/timePeriod/model'

export type Context = {
    getTravelerById: typeof getTravelerById;
    getBookingById: typeof getBookingById;
    getTimePeriodById: typeof getTimePeriodById
};

export const context = async (): Promise<Context> => {
    return {
        getTravelerById,
        getBookingById,
        getTimePeriodById
    };
};
