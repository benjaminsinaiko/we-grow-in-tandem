import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Calendar from './Calendar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function CalendarPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Calendar View</Typography>
      <Calendar />
    </div>
  );
}
