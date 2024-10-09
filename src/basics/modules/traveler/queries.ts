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
    traveler: (_parent: unknown, args: { id: string }) => {
        const { id } = args; 
    
        const traveler = getTravelerById(id)

        if (!traveler) {
            return null;
        }
    
        return {
            eraOfOrigin: traveler.eraOfOrigin,
            id: traveler.id,
            name: traveler.name,

        };
    }    
});
