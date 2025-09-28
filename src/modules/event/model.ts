const events = new Map();

events.set('#event1', {
    id: '#event1',
    title: 'Construction of the Pyramids',
    date: '2580 BC',
});

events.set('#event2', {
    id: '#event2',
    title: 'The Great Sphinx is Built',
    date: '2500 BC',
});

events.set('#event3', {
    id: '#event3',
    title: 'The Black Plague Sweeps Europe',
    date: '1347 AD',
});

export const getEventById = (id: string) => {
    return events.get(id);
};
