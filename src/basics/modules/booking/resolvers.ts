import { Context } from '../../context';
import { Booking } from './model';

export type BookingResolverParent = { id: string } & Partial<Booking>;

export const bookingResolvers = () => ({});
