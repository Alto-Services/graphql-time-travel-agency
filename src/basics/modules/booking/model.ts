export type Booking = {
    id: string;
    traveler: string;
    timePeriod: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
};

const bookings = new Map<string, Booking>();

bookings.set('1', {
    id: '1',
    traveler: '1',
    timePeriod: '1',
    status: 'CONFIRMED',
});

bookings.set('2', {
    id: '2',
    traveler: '2',
    timePeriod: '2',
    status: 'PENDING',
});

bookings.set('3', {
    id: '3',
    traveler: '2',
    timePeriod: '3',
    status: 'CANCELLED',
});

let idCounter = 3;

export const getAllBookings = () => {
    return Array.from(bookings.values());
};

export const getBookingById = (id: string) => {
    return bookings.get(id);
};

export const createBooking = (booking: {
    traveler: string;
    timePeriod: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}) => {
    idCounter += 1;
    bookings.set(`${idCounter}`, { ...booking, id: `${idCounter}` });
    console.log('set mutation');

    return bookings.get(`${idCounter}`);
};
