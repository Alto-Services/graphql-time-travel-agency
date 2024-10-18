import { getTravelerById, listAllTravelers } from './model';

export const travelerQueries = () => ({
    traveler: (_, args) => getTravelerById(args.id),
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
