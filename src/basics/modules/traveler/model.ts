export type Traveler = {
    id: string;
    name: string;
    eraOfOrigin: 'MODERN' | 'FUTURE' | 'ANCIENT';
    activeBookings: string[];
};

const travelers = new Map<string, Traveler>();

travelers.set('1', {
    id: '1',
    name: 'John Doe',
    eraOfOrigin: 'MODERN',
    activeBookings: ['1'],
});

travelers.set('2', {
    id: '2',
    name: 'Jane Smith',
    eraOfOrigin: 'FUTURE',
    activeBookings: ['2', '3'],
});

travelers.set('3', {
    id: '3',
    name: 'Cleopatra',
    eraOfOrigin: 'ANCIENT',
    activeBookings: [],
});

export const listAllTravelers = () => {
    return Array.from(travelers.values());
};

export const getTravelerById = (id: string) => {
    return travelers.get(id);
};
