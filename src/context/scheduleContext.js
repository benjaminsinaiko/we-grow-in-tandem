import React, { createContext, useReducer, useContext } from 'react';
import moment from 'moment';

import getScheduleDates from '../utils/getScheduleDates';

const ScheduleContext = createContext();
const ScheduleDispatchContext = createContext();

function sheduleReducer(state, action) {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initStart = moment()
  .year(2019)
  .month(11)
  .date(16)
  .hours(12)
  .startOf('h');
const initEnd = moment(initStart).add(12, 'w');

const initialDates = {
  startDate: initStart,
  endDate: initEnd,
  duration: 12,
  durationUnit: 'w'
};

function init() {
  const { startDate, endDate, duration, durationUnit } = initialDates;
  const plantSchedule = getScheduleDates(startDate, endDate, duration, durationUnit);
  return { ...initialDates, plantSchedule: plantSchedule };
}

function ScheduleProvider({ children }) {
  const [schedule, dispatch] = useReducer(sheduleReducer, initialDates, init);

  return (
    <ScheduleContext.Provider value={schedule}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        {children}
      </ScheduleDispatchContext.Provider>
    </ScheduleContext.Provider>
  );
}

function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}

function useScheduleDispatch() {
  const context = useContext(ScheduleDispatchContext);
  if (context === undefined) {
    throw new Error('useScheduleDispatch must be used within a ScheduleProvider');
  }
  return context;
}

export { ScheduleProvider, useSchedule, useScheduleDispatch };
