import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents, type AppDispatch, type RootState } from "../store";
import type { Event } from '../shared/interfaces';
import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { convertEventsToDateEvents } from "../helpers/convetEventsToDateEvents";

export const useCalendarStore = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    const { user } = useSelector((state: any) => state.auth);

    const setActiveEvent = (event: Event | null) => dispatch(onSetActiveEvent(event));
    const addNewEvent = (event: Event) => dispatch(onAddNewEvent(event))
    const updateEvent = (event: Event) => dispatch(onUpdateEvent(event))
    const deleteEvent = () => dispatch(onDeleteEvent());
    const loadingEvents = (events: Event[] | null) => dispatch(onLoadEvents(events));

    const startSavingEvent = async (calendarEvent: Event) => {
        try {

            if (calendarEvent.id) {
                // Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)

                updateEvent({ ...calendarEvent, user });
                return;
            }

            // creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            // console.log('se esta creando un evento: ', { data });

            addNewEvent({ ...calendarEvent, id: data.event.id, user });

        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    }

    const handleStartDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent!.id}`);
            deleteEvent()
        } catch (error: any) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            // console.log('Eventos cargados del backend', data.events );

            const events = convertEventsToDateEvents(data.events);

            // console.log('Eventos con fechas Date no string:', events);

            loadingEvents(events);

        } catch (error) {
            console.log('Error loading events');
            console.log(error);
        }
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
        startLoadingEvents,
    }
}
