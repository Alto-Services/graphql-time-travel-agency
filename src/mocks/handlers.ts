import { http, HttpResponse } from 'msw';

let startTime: number | null = null;

const getStartTime = () => {
    if (!startTime) {
        startTime = Date.now();
    }
    return startTime;
};

export const __resetDepartureApiCallStartTime = () => {
    startTime = null;
};

export const handlers = [
    // Mock departure times endpoint with unreliable behavior
    http.get('https://api.easydelorean.com/departures/:era', ({ request, params }) => {
        const url = new URL(request.url);

        // Simulate unreliable API: fail calls until 3 seconds have passed
        if (Date.now() - getStartTime() < 3000) {
            return HttpResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
        }

        if (params.era === 'FUTURE') {
            __resetDepartureApiCallStartTime();
            return HttpResponse.json({
                departures: [
                    {
                        id: 'departure-1',
                        era: 'FUTURE',
                        departureTime: '1985-10-26T10:28:00Z',
                        vehicle: 'DeLorean DMC-12',
                    },
                ],
            });
        }

        return HttpResponse.json({
            departures: [],
        });
    }),
];
