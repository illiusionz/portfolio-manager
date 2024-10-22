import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the CSS file
import './CalendarPage.scss';
import EarningsCalendar from '../../components/EarningsCalendar/EarningsCalendar';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'Meeting with Alex',
    start: new Date(2024, 9, 19, 10, 0), // Year, Month (0-based), Date, Hour, Minute
    end: new Date(2024, 9, 19, 12, 0),
  },
  {
    title: 'Conference Call',
    start: new Date(2024, 9, 20, 14, 0),
    end: new Date(2024, 9, 20, 15, 0),
  },
  {
    title: 'Team Standup',
    start: new Date(2024, 9, 21, 9, 0),
    end: new Date(2024, 9, 21, 10, 0),
  },
];

const CalendarPage = () => {
  const [events, setEvents] = useState(myEventsList);

  return (
    <div className='container mt-4' style={{ height: '100vh' }}>
      <h2>My Calendar</h2>
      <div className='calendar-section'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          defaultView='month' // You can set this to "month", "week", "day", or "agenda"
          views={['month', 'week', 'day']}
        />
      </div>

      {/* Wrap EarningsCalendar in a full-width div for single-column layout */}
      <div className='earnings-section mt-4'>
        <EarningsCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
