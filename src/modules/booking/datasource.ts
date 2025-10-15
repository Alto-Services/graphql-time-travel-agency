export type Booking = {
    id: string;
    travelerId: string;
    timePeriodId: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
};

const bookings = new Map<string, Booking>();

bookings.set('#booking1', {
    id: '#booking1',
    travelerId: '#traveler1',
    timePeriodId: '#timePeriod1',
    status: 'CONFIRMED',
});

bookings.set('#booking2', {
    id: '#booking2',
    travelerId: '#traveler2',
    timePeriodId: '#timePeriod2',
    status: 'PENDING',
});

bookings.set('#booking3', {
    id: '#booking3',
    travelerId: '#traveler2',
    timePeriodId: '#timePeriod3',
    status: 'CANCELLED',
});

let idCounter = 3;

export const getAllBookings = () => {
    return Array.from(bookings.values());
};

let __bookingDbCallCounter = 0;

export const __getBookingDbCallCounter = () => __bookingDbCallCounter;
export const __resetBookingDbCallCounter = () => (__bookingDbCallCounter = 0);

export const getBookingById = (id: string) => {
    __bookingDbCallCounter++;
    return bookings.get(id);
};

export const createBooking = (booking: {
    travelerId: string;
    timePeriodId: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}) => {
    idCounter += 1;

    const id = `#booking${idCounter}`;
    const newBooking: Booking = { ...booking, id };
    bookings.set(id, newBooking);

    return newBooking;
};
