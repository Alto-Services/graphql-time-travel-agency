const events = new Map();

events.set('1', {
    id: '1',
    title: 'Construction of the Pyramids',
    date: '2580 BC',
});

events.set('2', {
    id: '2',
    title: 'The Great Sphinx is Built',
    date: '2500 BC',
});

events.set('3', {
    id: '3',
    title: 'The Black Plague Sweeps Europe',
    date: '1347 AD',
});

export const getEventById = (id: string) => {
    return events.get(id);
};
