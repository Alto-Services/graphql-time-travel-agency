const timePeriods = new Map();

timePeriods.set('1', {
    id: '1',
    name: 'Ancient Egypt',
    era: 'ANCIENT',
    majorEvents: ['1', '2'],
});

timePeriods.set('2', {
    id: '2',
    name: 'Medieval Europe',
    era: 'MEDIEVAL',
    majorEvents: ['3'],
});

timePeriods.set('3', {
    id: '3',
    name: 'Future Mars Colony',
    era: 'FUTURE',
    majorEvents: [],
});

export const getAllTimePeriods = () => {
    return Array.from(timePeriods.values());
};

export const getTimePeriodById = (id: string) => {
    return timePeriods.get(id);
};
