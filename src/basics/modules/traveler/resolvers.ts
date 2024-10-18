import { Context } from '../../context';
import { Traveler } from './model';

type TravelerResolverParent = { id: string } & Partial<Traveler>;

export const travelerResolvers = () => ({
    name: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        const travelerName = parent.name ?? getTravelerById(parent.id)?.name;
        if (args.toUpperCase) {
            return travelerName?.toUpperCase();
        }
        return travelerName;
    },
    eraOfOrigin: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.eraOfOrigin ?? getTravelerById(parent.id)?.eraOfOrigin;
    },
    activeBookings: (parent: TravelerResolverParent, args: unknown, { getBookingById, getTravelerById }: Context) => {
        return parent.activeBookings !== null ?
            parent.activeBookings?.map(bookingId => getBookingById(bookingId)) :
            getTravelerById(parent.id)?.activeBookings.map(bookingId => getBookingById(bookingId));
    },
});
