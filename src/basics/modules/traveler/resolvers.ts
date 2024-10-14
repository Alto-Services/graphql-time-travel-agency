import { get } from 'mongoose';
import { Context } from '../../context';
import { Traveler } from './model';
import { getBookingById } from '../booking/model';

type TravelerResolverParent = { id: string } & Partial<Traveler>; // why is this a partial type, as top level query will get the whole object

export const travelerResolvers = () => ({
    // do i need this method as the top level query returns same type
    name: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.name ?? getTravelerById(parent.id)?.name;
    },
        // do i need this method as the top level query returns same type
    eraOfOrigin: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.eraOfOrigin ?? getTravelerById(parent.id)?.eraOfOrigin;
    },
    activeBookings: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        // should I be checking that activeBookings is already an object type?
        return parent.activeBookings?.map(bookingId => getBookingById(bookingId));
    }
});
