import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';

import COLORS from '../utils/colors';
import { useSchedule } from '../context/scheduleContext';
import StartPicker from './StartPicker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  dateRange: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1),
      fontSize: '.8em'
    }
  },
  updateIcon: {
    marginRight: theme.spacing(1)
  }
}));

function displayFormat(date) {
  return moment(date).format('MMM Do');
}

export default function NavBar() {
  const classes = useStyles();
  const { startDate, endDate } = useSchedule();
  const [updateOpen, setUpdateOpen] = useState(true);

  console.log(moment(startDate).format());
  console.log(moment(endDate).format());

  function handleOpen() {
    setUpdateOpen(true);
  }

  function handleClose() {
    setUpdateOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ backgroundColor: COLORS.purple }}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            WeGrow
          </Typography>
          <Typography className={classes.dateRange}>{`${displayFormat(startDate)} - ${displayFormat(
            endDate
          )}`}</Typography>
          <Tooltip title='Update Schedule'>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleOpen}>
              <UpdateIcon className={classes.updateIcon} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <StartPicker updateOpen={updateOpen} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  );
}
