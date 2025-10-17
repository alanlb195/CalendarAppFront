import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, type AppDispatch, type RootState } from "../store";
import type { CalendarEvent } from '../shared/interfaces';

export const useCalendarStore = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

    const setActiveEvent = (event: CalendarEvent | null) => dispatch(onSetActiveEvent(event));
    const addNewEvent = (event: CalendarEvent) => dispatch(onAddNewEvent(event))
    const updateEvent = (event: CalendarEvent) => dispatch(onUpdateEvent(event))
    const deleteEvent = () => dispatch(onDeleteEvent())

    const startSavingEvent = async (calendarEvent: CalendarEvent) => {
        // TODO: llegar al backend
        // Todo bien
        if (calendarEvent._id) {
            // Actualizando
            updateEvent({ ...calendarEvent });
        } else {
            // creando
            addNewEvent({ ...calendarEvent, _id: new Date().getTime() });
        }
    }

    const handleStartDeletingEvent = async () => {
        // TODO: Llegar al backend

        deleteEvent()
    }

    return {
        //* Properties
        events,
        activeEvent,

        //* Computed
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        handleStartDeletingEvent,
    }
}
