import { createSlice } from '@reduxjs/toolkit'
import type { CalendarEvent } from '../../shared/interfaces'

const tempEvent: CalendarEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date('2025-10-24T18:00:00'),
    end: new Date('2025-10-25T20:00:00'),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Alan'
    }
}

export interface CalendarState {
    events: CalendarEvent[];
    activeEvent: null | CalendarEvent;
}

const initialState: CalendarState = {
    events: [tempEvent],
    activeEvent: null,
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
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions

export default calendarSlice.reducer
