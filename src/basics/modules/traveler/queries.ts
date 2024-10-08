import { getTravelerById, listAllTravelers } from './model';

type TravelerQueryArgs = { id: string };

export const travelerQueries = () => ({
    travelers: () => listAllTravelers(),
    traveler: (parent: unknown, { id }: TravelerQueryArgs) => {
        return getTravelerById(id);
    },
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
