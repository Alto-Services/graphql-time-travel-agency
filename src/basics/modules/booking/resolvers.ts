import { Context } from '../../context';
import { Booking } from './model';

export type BookingResolverParent = { id: string } & Partial<Booking>;

export const bookingResolvers = () => ({
    traveler: (parent: BookingResolverParent, args: unknown, { getTravelerById, getBookingById }: Context) => {
        const travelerId = parent.traveler ?? getBookingById(parent.id)?.traveler;
        if (!travelerId) {
            return null;
        }
        return getTravelerById(travelerId);
    },
    timePeriod: (parent: BookingResolverParent, args: unknown, { getTimePeriodById, getBookingById }: Context) => {
        const timePeriodId = parent.timePeriod ?? getBookingById(parent.id)?.timePeriod;
        if (!timePeriodId) {
            return null;
        }
        return getTimePeriodById(timePeriodId);
    },
});
