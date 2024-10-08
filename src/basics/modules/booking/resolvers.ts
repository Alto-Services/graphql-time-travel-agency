import { Context } from '../../context';
import { getTravelerById } from '../traveler/model';
import { Booking } from './model';
import { getTimePeriodById } from '../timePeriod/model';

export type BookingResolverParent = { id: string } & Partial<Booking>;

export const bookingResolvers = () => ({
  traveler: (parent: BookingResolverParent, args: unknown, { getBookingById }: Context) => {
    const travelerId = parent.traveler ?? getBookingById(parent.id)?.traveler;

    // this could be null but traveller is required
    if (!travelerId) {
      return null;
    }

    // this could be undefined but traveller is required
    return getTravelerById(travelerId);
  },

  timePeriod: (parent: BookingResolverParent, args: unknown, { getBookingById }: Context) => {
    const timePeriodId = parent.timePeriod ?? getTimePeriodById(parent.id)?.timePeriod;

    return getTimePeriodById(timePeriodId);
  },

  status: (parent: BookingResolverParent, args: unknown, { getBookingById }: Context) => {
    return parent.status ?? getBookingById(parent.id)?.status;
  },
});
