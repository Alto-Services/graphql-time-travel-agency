import { getTravelerById, listAllTravelers } from './model';

export const travelerQueries = () => ({
    travelers: () => listAllTravelers(),
    people: () => {
        return [
            ...listAllTravelers(),
            {
                id: '-1',
                name: 'The Universe',
                expertise: '42',
            },
        ];
    },
});
