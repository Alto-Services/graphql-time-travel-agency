import { Context } from '../../context';
import { Booking } from './model';

export type BookingResolverParent = { id: string } & Partial<Booking>;


export const bookingResolvers = () => ({
    id: (parent: BookingResolverParent, _: unknown, { getBookingById }: Context) => {
            return parent.id ?? getBookingById(parent.id)?.id;
    },
    traveler: (parent: BookingResolverParent, _: unknown, { getTravelerById }: Context) => {
        if (!parent.traveler) return null;
        const traveler = getTravelerById(parent.traveler);
        return traveler ? { name: traveler.name } : null
      },
    timePeriod:(parent: BookingResolverParent, _: unknown, { getTimePeriodById }: Context) => {
        if (!parent.timePeriod) return null;
        const timePeriod = getTimePeriodById(parent.timePeriod);
        return timePeriod ? { name: timePeriod.name } : null
      },
}


);
