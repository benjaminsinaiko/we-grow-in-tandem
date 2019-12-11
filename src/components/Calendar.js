import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useSchedule } from '../context/scheduleContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Calendar() {
  const classes = useStyles();
  const schedule = useSchedule();

  console.log('schedule', schedule);

  return (
    <div className={classes.root}>
      <Typography>Calendar View</Typography>
    </div>
  );
}
