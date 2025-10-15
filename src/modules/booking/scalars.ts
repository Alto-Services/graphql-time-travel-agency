import { GraphQLScalarType, GraphQLError } from 'graphql';
import { z } from 'zod';

const bookingIdSchema = z.string().regex(/^#booking\d+$/, {
    message: 'Invalid BookingID format. Expected format: #booking<number>',
});

export const BookingID = new GraphQLScalarType({
    name: 'BookingID',
    description: 'A validated Booking ID (format: #booking<number>)',

    serialize: (value: unknown): string => {
        const result = z.string().safeParse(value);
        if (!result.success) {
            throw new GraphQLError('BookingID must be a string');
        }
        return result.data;
    },

    parseValue: (value: unknown): string => {
        const result = bookingIdSchema.safeParse(value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },

    parseLiteral: (ast: any): string => {
        if (ast.kind !== 'StringValue') {
            throw new GraphQLError('BookingID must be a string');
        }
        const result = bookingIdSchema.safeParse(ast.value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },
});
