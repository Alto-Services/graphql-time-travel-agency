import { z } from 'zod';
import { createBooking, getBookingById } from './model';
import { Context } from '../../context';

const createBookingArgs = z.object({
    input: z.object({
        travelerId: z.string(),
        timePeriodId: z.string(),
    }),
});

export const bookingMutations = () => ({
    createBooking: (parent: unknown, args: unknown, { getTravelerById }: Context) => {
        const maybeArgs = createBookingArgs.safeParse(args);
        if (!maybeArgs.success) {
            throw new Error('Invalid args');
        }
        const { timePeriodId, travelerId } = maybeArgs.data.input;

        if (!getTravelerById(travelerId)) {
            return {
                message: 'Failed to find the traveler.',
            };
        }

        return createBooking({
            traveler: travelerId,
            timePeriod: timePeriodId,
            status: 'PENDING',
        });
    },
});
