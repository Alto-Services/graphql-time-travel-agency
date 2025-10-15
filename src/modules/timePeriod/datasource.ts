export type TimePeriod = {
    id: string;
    name: string;
    era: 'ANCIENT' | 'MEDIEVAL' | 'MODERN' | 'FUTURE';
};

const timePeriods = new Map<string, TimePeriod>();

timePeriods.set('#timePeriod1', {
    id: '#timePeriod1',
    name: 'Ancient Egypt',
    era: 'ANCIENT',
});

timePeriods.set('#timePeriod2', {
    id: '#timePeriod2',
    name: 'Medieval Europe',
    era: 'MEDIEVAL',
});

timePeriods.set('#timePeriod3', {
    id: '#timePeriod3',
    name: 'Future Mars Colony',
    era: 'FUTURE',
});

export const getAllTimePeriods = () => {
    return Array.from(timePeriods.values());
};

export const getTimePeriodById = (id: string) => {
    return timePeriods.get(id);
};
