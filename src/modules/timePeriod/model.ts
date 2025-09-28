const timePeriods = new Map();

timePeriods.set('#timePeriod1', {
    id: '#timePeriod1',
    name: 'Ancient Egypt',
    era: 'ANCIENT',
    majorEvents: ['#event1', '#event2'],
});

timePeriods.set('#timePeriod2', {
    id: '#timePeriod2',
    name: 'Medieval Europe',
    era: 'MEDIEVAL',
    majorEvents: ['#event3'],
});

timePeriods.set('#timePeriod3', {
    id: '#timePeriod3',
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
