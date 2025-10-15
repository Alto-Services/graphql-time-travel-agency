import { Context } from '../../context';
import { Booking } from './datasource';

export type BookingResolverParent = { id: string } & Partial<Booking>;

export const bookingResolvers = () => ({
    // A suspiciously empty resolver 🤔...
});
