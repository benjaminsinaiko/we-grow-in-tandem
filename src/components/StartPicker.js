import moment from 'moment';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/moment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
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

export default function StartPicker({ updateOpen, handleOpen, handleClose }) {
  const classes = useStyles();
  const [date, setDate] = useState(moment());
  const [duration, setDuration] = useState(4);
  console.log('selectedDate', date);
  console.log('duration', duration);

  function handleDateChange(date) {
    setDate(date);
  }

  function handleDurChange(e) {
    setDuration(e.target.value);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='set-schedule-dialog'
      open={updateOpen}
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
                  value={date}
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
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button disabled={!duration} onClick={handleClose} color='primary'>
            OK
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
