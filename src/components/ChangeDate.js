import React, { useState, useCallback } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';

import COLORS from '../utils/colors';
import { displayRangeFormat } from '../utils/dateHelpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    margin: 'auto',
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen
  },
  dateChangeControl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function getDay(date) {
  return moment(date).day();
}

function changeByOneDay(date, direction) {
  if (direction === 'increment') {
    return moment(date).add(1, 'd');
  } else if (direction === 'decrement') {
    return moment(date).subtract(1, 'd');
  } else {
    return date;
  }
}

function isInvalidDate(date, moveDirection) {
  if (getDay(date) === 1 && moveDirection === 'decrement') {
    return true;
  }
  if (getDay(date) === 5 && moveDirection === 'increment') {
    return true;
  }
  return false;
}

export default function ChangeDate({ selectedPlant }) {
  const classes = useStyles();
  const [newDate, setNewDate] = useState(selectedPlant.start);

  const handleChangeDate = useCallback(
    direction => {
      setNewDate(changeByOneDay(newDate, direction));
    },
    [newDate]
  );

  return (
    <div className={classes.root}>
      <Typography variant='h6'>Adjust one day</Typography>
      <div className={classes.dateChangeControl}>
        <IconButton
          disabled={isInvalidDate(newDate, 'decrement')}
          onClick={() => handleChangeDate('decrement')}
        >
          <SubtractIcon />
        </IconButton>
        <Typography>{displayRangeFormat(newDate)}</Typography>
        <IconButton
          disabled={isInvalidDate(newDate, 'increment')}
          onClick={() => handleChangeDate('increment')}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}
