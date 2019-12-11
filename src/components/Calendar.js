import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useSchedule } from '../context/scheduleContext';
import PlantInfo from './PlantInfo';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '75vh',
    width: '90%',
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

export default function Calendar() {
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const { plantSchedule } = useSchedule();
  const [selectedPlant, setSelectedPlant] = useState('');
  const [plantOpen, setPlantOpen] = useState(false);

  console.log('plantSchedule', plantSchedule);

  const handlePlantOpen = e => {
    setSelectedPlant(e);
    setPlantOpen(true);
  };

  const handlePlantClose = () => {
    setSelectedPlant('');
    setPlantOpen(false);
  };

  return (
    <Paper elevation={10} className={classes.root}>
      <BigCalendar
        style={{ width: '100%' }}
        localizer={localizer}
        events={plantSchedule}
        views={{ month: true, week: true, day: true }}
        onSelectEvent={handlePlantOpen}
      />
      <PlantInfo
        plantOpen={plantOpen}
        handlePlantClose={handlePlantClose}
        selectedPlant={selectedPlant}
      />
    </Paper>
  );
}
