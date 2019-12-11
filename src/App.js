import React from 'react';

import { ScheduleProvider } from './context/scheduleContext';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';

function App() {
  return (
    <ScheduleProvider>
      <Navbar />
      <Calendar />
    </ScheduleProvider>
  );
}

export default App;
