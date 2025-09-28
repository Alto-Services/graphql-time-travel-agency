export type Traveler = {
    id: string;
    name: string;
    eraOfOrigin: 'MODERN' | 'FUTURE' | 'ANCIENT';
    activeBookings: string[];
};

const travelers = new Map<string, Traveler>();

travelers.set('#traveler1', {
    id: '#traveler1',
    name: 'John Doe',
    eraOfOrigin: 'MODERN',
    activeBookings: ['#booking1'],
});

travelers.set('#traveler2', {
    id: '#traveler2',
    name: 'Jane Smith',
    eraOfOrigin: 'FUTURE',
    activeBookings: ['#booking2', '#booking3'],
});

travelers.set('#traveler3', {
    id: '#traveler3',
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
