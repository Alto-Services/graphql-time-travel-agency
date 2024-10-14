import { Context } from '../../context';
import { Traveler } from './model';

type TravelerResolverParent = { id: string } & Partial<Traveler>; // why is this a partial type, as top level query will get the whole object

export const travelerResolvers = () => ({
    name: (parent: TravelerResolverParent, args: { toUppercase?: boolean }, { getTravelerById }: Context) => {
        const name = parent.name ?? getTravelerById(parent.id)?.name;

        if (args.toUppercase) {
            return name?.toUpperCase();
        }

        return name
    },
        // do i need this method as the top level query returns same type
    eraOfOrigin: (parent: TravelerResolverParent, args: unknown, { getTravelerById }: Context) => {
        return parent.eraOfOrigin ?? getTravelerById(parent.id)?.eraOfOrigin;
    },
    activeBookings: (parent: TravelerResolverParent, args: unknown, { getBookingById }: Context) => {
        // should I be checking whether activeBookings is not already an object type before retreiving?
        return parent.activeBookings?.map(bookingId => getBookingById(bookingId)); 
    }
});
