import { createBooking, getBookingById } from './datasource';
import { Context } from '../../context';

type CreateBookingArgs = {
    input: {
        travelerId: string;
        timePeriodId: string;
    };
};

export const bookingMutations = () => ({
    createBooking: (parent: unknown, args: CreateBookingArgs, { getTravelerById }: Context) => {
        const { timePeriodId, travelerId } = args.input;

        if (!getTravelerById(travelerId)) {
            return {
                message: 'Failed to find the traveler.',
            };
        }

        return createBooking({
            travelerId,
            timePeriodId,
            status: 'PENDING',
        });
    },
});
