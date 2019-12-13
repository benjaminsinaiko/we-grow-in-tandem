import React, { createContext, useReducer, useContext } from 'react';
import moment from 'moment';

import getScheduleDates from '../utils/getScheduleDates';
import { getEndDate } from '../utils/dateHelpers';

const ScheduleContext = createContext();
const ScheduleDispatchContext = createContext();

// Watering schedule reducer
function sheduleReducer(state, action) {
  switch (action.type) {
    case 'SET_SCHEDULE': {
      return {
        startDate: action.startDate,
        endDate: action.endDate,
        plantSchedule: action.plantSchedule
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Get initial dates
const initStart = moment()
  .year(2019)
  .month(11)
  .date(16)
  .hours(12)
  .startOf('h');
const initEnd = getEndDate(initStart, 12);

const initialDates = {
  startDate: initStart,
  endDate: initEnd
};

// Lazy initialization of watering schedule
function init() {
  const { startDate, endDate } = initialDates;
  const plantSchedule = getScheduleDates(startDate, endDate);
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

// Custom context hook for reducer state
function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}

// Custom context hook for reducer dispatch
function useScheduleDispatch() {
  const context = useContext(ScheduleDispatchContext);
  if (context === undefined) {
    throw new Error('useScheduleDispatch must be used within a ScheduleProvider');
  }
  return context;
}

export { ScheduleProvider, useSchedule, useScheduleDispatch };
