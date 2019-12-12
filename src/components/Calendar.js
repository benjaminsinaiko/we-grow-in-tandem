import React, { useState, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useSchedule } from '../context/scheduleContext';
import './styles.css';
import COLORS from '../utils/colors';
import PlantInfo from './PlantInfo';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '75vh',
    width: '90%',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    '& a': {
      fontSize: '1.5em',
      color: COLORS.purple
    },
    [theme.breakpoints.down('xs')]: {
      '& a': {
        fontSize: '1em'
      }
    }
  }
}));

function eventStyle() {
  const style = {
    backgroundColor: COLORS.green,
    height: 35,
    display: 'flex',
    alignItems: 'center'
  };
  return { style: style };
}

export default function Calendar() {
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const { plantSchedule } = useSchedule();
  const [selectedPlant, setSelectedPlant] = useState('');
  const [plantOpen, setPlantOpen] = useState(false);

  const handlePlantOpen = useCallback(plant => {
    setSelectedPlant(plant);
    setPlantOpen(true);
  }, []);

  const handlePlantClose = useCallback(() => {
    setSelectedPlant('');
    setPlantOpen(false);
  }, []);

  return (
    <Paper elevation={10} className={classes.root}>
      <BigCalendar
        style={{ width: '100%' }}
        localizer={localizer}
        events={plantSchedule}
        views={{ month: true, work_week: true, day: true }}
        onSelectEvent={handlePlantOpen}
        eventPropGetter={eventStyle}
        step={30}
        timeslots={12}
      />
      <PlantInfo
        plantOpen={plantOpen}
        handlePlantClose={handlePlantClose}
        selectedPlant={selectedPlant}
        plantSchedule={plantSchedule}
      />
    </Paper>
  );
}
