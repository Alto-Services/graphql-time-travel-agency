import { GraphQLScalarType, GraphQLError } from 'graphql';
import { z } from 'zod';

const travelerIdSchema = z.string().regex(/^#traveler\d+$/, {
    message: 'Invalid TravelerID format. Expected format: #traveler<number>',
});

export const TravelerID = new GraphQLScalarType({
    name: 'TravelerID',
    description: 'A validated Traveler ID (format: #traveler<number>)',

    serialize: (value: unknown): string => {
        const result = z.string().safeParse(value);
        if (!result.success) {
            throw new GraphQLError('TravelerID must be a string');
        }
        return result.data;
    },

    parseValue: (value: unknown): string => {
        const result = travelerIdSchema.safeParse(value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },

    parseLiteral: (ast: any): string => {
        if (ast.kind !== 'StringValue') {
            throw new GraphQLError('TravelerID must be a string');
        }
        const result = travelerIdSchema.safeParse(ast.value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },
});
