import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarPageLigth.css'
import './CalendarPageDark.css'

import { Navbar, CalendarEventBox, CalendarModal, FabAddNewEvent } from "../"
import { localizer, getMessagesES } from '../../helpers/';
import { useEffect, useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useThemeStore } from '../../hooks/useThemeStore';
import { FabDeleteEvent } from '../components/FabDeleteEvent'


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  // console.log('Eventos cargados en el calendario:', events);
  const { currentTheme } = useThemeStore();
  // console.log('Tema actual:', currentTheme);


  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(currentTheme);
  }, [currentTheme]);


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


  const eventStyleGetter = (
    // event: any,
    // start: any,
    // end: any,
    // isSelected: any
  ) => {
    // console.log({ event, start, end, isSelected });
    const style = {
      boderRadius: '0px',
      opacity: 1,
      color: 'white'
    }

    return {
      style
    }
  }

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
        }))} defaultView={lastView}
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
