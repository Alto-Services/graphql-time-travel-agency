import { getTravelerById } from './modules/traveler/model';
import { travelerLoader } from './modules/traveler/dataloader';
import { getBookingById } from './modules/booking/model';

export type Context = {
    getTravelerById: typeof getTravelerById;
    getBookingById: typeof getBookingById;
    travelerLoader: typeof travelerLoader;
};

export const context = async (): Promise<Context> => {
    return {
        getTravelerById,
        getBookingById,
        travelerLoader
    };
};
