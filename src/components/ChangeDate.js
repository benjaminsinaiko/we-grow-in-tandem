import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';

import COLORS from '../utils/colors';
import { displayRangeFormat, isInvalidDate, changeByOneDay } from '../utils/dateHelpers';

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

export default function ChangeDate({ selectedPlant }) {
  const classes = useStyles();
  const [newDate, setNewDate] = useState(selectedPlant.start);
  const [sameDate, setSameDate] = useState(true);

  useEffect(() => {
    const isSame = moment(selectedPlant.start).isSame(moment(newDate));
    setSameDate(isSame);
  }, [selectedPlant.start, newDate]);

  const handleChangeDate = useCallback(
    direction => {
      setNewDate(changeByOneDay(newDate, direction));
    },
    [newDate]
  );

  function handleSubmit() {
    console.log(selectedPlant.id);
    console.log(newDate);
  }

  return (
    <div className={classes.root}>
      <Button
        disabled={sameDate}
        color={sameDate ? 'inherit' : 'primary'}
        variant={sameDate ? 'text' : 'outlined'}
        onClick={handleSubmit}
      >
        Change Day
      </Button>
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
