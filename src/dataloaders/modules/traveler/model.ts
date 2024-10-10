export type Traveler = {
    id: string;
    name: string;
    eraOfOrigin: 'MODERN' | 'FUTURE' | 'ANCIENT';
    activeBookings: string[];
};

export const travelers = new Map<string, Traveler>();

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

export let getCounter = 0;

export const getTravelerById = (id: string) => {
    getCounter++;
    return travelers.get(id);
};

export const listTravelerByIds = async (ids: string[]) => {
    getCounter++;
    return ids.map((id) => travelers.get(id)).filter(<T>(x: T | undefined): x is T => !!x);
};
