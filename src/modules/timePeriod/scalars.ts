import { GraphQLScalarType, GraphQLError } from 'graphql';
import { z } from 'zod';

const timePeriodIdSchema = z.string().regex(/^#timePeriod\d+$/, {
    message: 'Invalid TimePeriodID format. Expected format: #timePeriod<number>',
});

export const TimePeriodID = new GraphQLScalarType({
    name: 'TimePeriodID',
    description: 'A validated TimePeriod ID (format: #timePeriod<number>)',

    serialize: (value: unknown): string => {
        const result = z.string().safeParse(value);
        if (!result.success) {
            throw new GraphQLError('TimePeriodID must be a string');
        }
        return result.data;
    },

    parseValue: (value: unknown): string => {
        const result = timePeriodIdSchema.safeParse(value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },

    parseLiteral: (ast: any): string => {
        if (ast.kind !== 'StringValue') {
            throw new GraphQLError('TimePeriodID must be a string');
        }
        const result = timePeriodIdSchema.safeParse(ast.value);
        if (!result.success) {
            throw new GraphQLError(result.error.errors[0].message);
        }
        return result.data;
    },
});
