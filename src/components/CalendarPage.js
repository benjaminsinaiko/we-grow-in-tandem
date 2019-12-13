import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import COLORS from '../utils/colors';
import Calendar from './Calendar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    color: '#fff',
    background: COLORS.green,
    padding: theme.spacing(2, 3, 1.25),
    fontFamily: 'Neucha, Roboto, Helvetica',
    fontWeight: 'bold',
    borderRadius: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.4em'
    }
  }
}));

export default function CalendarPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align='center' variant='h4' className={classes.header}>
        Plant Watering Schedule
      </Typography>

      <Calendar />
    </div>
  );
}
