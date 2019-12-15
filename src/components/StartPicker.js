import moment from 'moment';
import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/moment';
import { createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import COLORS from '../utils/colors';
import { useScheduleDispatch } from '../context/scheduleContext';
import { getEndDate, displayRangeFormat } from '../utils/dateHelpers';
import { getScheduleDates } from '../utils/getSchedule';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  panel: {
    [theme.breakpoints.up('sm')]: {
      width: 500
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  dialogTitle: {
    backgroundColor: COLORS.blue,
    color: '#fff'
  },
  inputs: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  dateRange: {
    fontSize: '.9em',
    color: COLORS.purple
  }
}));

const pickerTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: COLORS.blue
      }
    },
    MuiPickersDay: {
      day: {
        color: COLORS.purple
      },
      daySelected: {
        backgroundColor: COLORS.blue
      },
      dayDisabled: {
        color: COLORS.lightPurple
      },
      current: {
        color: COLORS.blue
      }
    }
  }
});

export default function StartPicker({ updateOpen, handleClose }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(moment());
  const [duration, setDuration] = useState(4);
  const [endDate, setEndDate] = useState();
  const dispatchSchedule = useScheduleDispatch();

  useEffect(() => {
    setEndDate(getEndDate(startDate, duration));
  }, [startDate, duration]);

  function handleDateChange(date) {
    if (moment(date).isValid()) {
      setStartDate(moment(date).startOf('d'));
    } else {
      setStartDate(null);
    }
  }

  function handleDurChange(e) {
    setDuration(e.target.value);
  }

  function handleSubmit() {
    const schedule = {
      startDate: startDate,
      endDate: endDate,
      plantSchedule: getScheduleDates(startDate, endDate)
    };
    handleClose();
    dispatchSchedule({ type: 'SET_SCHEDULE', ...schedule });
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='set-schedule-dialog'
      open={updateOpen}
      transitionDuration={{ enter: 750, exit: 1500 }}
      className={classes.root}
    >
      <div className={classes.panel}>
        <DialogTitle className={classes.dialogTitle} id='set-watering-schedule'>
          Set Watering Schedule
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a start date and duration to set the watering schedule.
          </DialogContentText>
          <div className={classes.inputs}>
            <ThemeProvider theme={pickerTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Start Date'
                  format='MM/DD/YYYY'
                  value={startDate}
                  disablePast
                  shouldDisableDate={date => date.day() === 0 || date.day() === 6}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
            <TextField
              style={{ width: '25%' }}
              margin='dense'
              size='small'
              id='duration'
              label='Duration'
              type='number'
              onChange={handleDurChange}
              value={duration}
              InputProps={{
                endAdornment: <InputAdornment position='end'>weeks</InputAdornment>
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {startDate && duration ? (
            <Typography className={classes.dateRange}>{`${displayRangeFormat(
              startDate
            )} - ${displayRangeFormat(endDate)}`}</Typography>
          ) : (
            <Typography className={classes.dateRange}>Enter date and duration</Typography>
          )}
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button disabled={!startDate || !duration} onClick={handleSubmit} color='primary'>
            SET
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
