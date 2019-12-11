import React from 'react';

import { ScheduleProvider } from './context/scheduleContext';
import Navbar from './components/Navbar';
import CalendarPage from './components/CalendarPage';

function App() {
  return (
    <ScheduleProvider>
      <Navbar />
      <CalendarPage />
    </ScheduleProvider>
  );
}

export default App;
