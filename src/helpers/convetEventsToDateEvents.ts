
export const convertEventsToDateEvents = (events: any[] = []) => {
    return events.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
    }));
};
