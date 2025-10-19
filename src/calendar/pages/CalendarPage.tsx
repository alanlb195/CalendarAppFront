import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarPageLigth.css'
import './CalendarPageDark.css'

import { Navbar, CalendarEventBox, CalendarModal, FabAddNewEvent } from "../"
import { localizer, getMessagesES } from '../../helpers/';
import { useEffect, useState } from 'react';
import { useAuthStore, useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useThemeStore } from '../../hooks/useThemeStore';
import { FabDeleteEvent } from '../components/FabDeleteEvent'


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  // console.log('Eventos cargados en el calendario:', events);
  const { currentTheme } = useThemeStore();
  // console.log('Tema actual:', currentTheme);
  const { user } = useAuthStore();


  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    startLoadingEvents();
  }, []);


  type Separators = "day" | "week" | "month" | "agenda";
  const raw = localStorage.getItem('lastView');
  const actualView: Separators =
    raw === "day" || raw === "week" || raw === "month" || raw === "agenda"
      ? raw
      : "week";
  const [lastView, setLastView] = useState<Separators>(actualView);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 🚀 Maneja los clics de < y > en el calendario
  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
    const isMyEvent = (user?._id === event.user._id);
    
    const myColor = '#2563eb';
    const othersColor = '#6b7280';

    const style = {
      backgroundColor: isMyEvent ? myColor : othersColor,
      borderRadius: '6px',
      opacity: isSelected ? 1 : 0.9,
      color: 'white',
      border: isSelected ? '2px solid white' : 'none',
      boxShadow: isSelected
        ? `0 0 6px ${isMyEvent ? 'rgba(37,99,235,0.6)' : 'rgba(107,114,128,0.6)'}`
        : '0 1px 3px rgba(0,0,0,0.2)',
      padding: '2px 6px',
      fontWeight: 600,
      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    };

    return { style };
  };


  const handleClick = (event: any) => {
    // console.log('hiciste un click en un evento');
    setActiveEvent(event);
  };

  const handleDoubleClick = () => {
    openDateModal();
  }

  const handleViewChange = (event: any) => {
    setLastView(event);
    localStorage.setItem('lastView', event);
  }

  const handleSelectSlot = (slotInfo: any) => {
    // console.log('Seleccionaste una casilla vacía o rango de casillas:', slotInfo);
    setActiveEvent(null);
  };


  return (
    <>
      <Navbar />

      <Calendar
        selectable={true} // Necesario para que onSelectSlot funcione
        onSelectSlot={handleSelectSlot}
        culture='es'
        localizer={localizer}
        events={events.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 56px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleClick}

        onView={handleViewChange}
        view={lastView}
        date={currentDate}
        onNavigate={handleNavigate}
      />

      <CalendarModal />

      <FabAddNewEvent />
      <FabDeleteEvent />
    </>
  )
}
