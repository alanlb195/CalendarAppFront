import { createSlice } from '@reduxjs/toolkit'
import type { Event } from '../../shared/interfaces'

export interface CalendarState {
    events: Event[];
    activeEvent: null | Event;
    isLoadingEvens: boolean;
}

const initialState: CalendarState = {
    events: [],
    activeEvent: null,
    isLoadingEvens: true,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent?.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvens = false;
            const uniqueEvents = payload.filter(
                (event: any) => !state.events.some(dbEvent => dbEvent.id === event.id)
            );
            state.events = [...state.events, ...uniqueEvents];
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvens = true;
            state.events         = []
            state.activeEvent    = null
        }

    },
})

// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions

export default calendarSlice.reducer
