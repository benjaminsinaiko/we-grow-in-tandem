import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import getUpcoming from '../utils/getUpcoming';
import plantImage from '../img/plant.png';
import COLORS from '../utils//colors';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: theme.spacing(2),
    '& img': {
      flexGrow: 1,
      objectFit: 'contain'
    }
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2
  },
  scheduleHeader: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1)
    }
  },
  upcomingCount: {
    fontSize: '.9em',
    color: COLORS.blue,
    marginLeft: theme.spacing(7)
  },
  listBox: {
    maxHeight: '25vh'
  }
}));

function displayDate(date) {
  return moment(date).format('ddd, MMM Do YYYY');
}

export default function PlantInfo({ plantOpen, handlePlantClose, selectedPlant, plantSchedule }) {
  const classes = useStyles();
  const [upcoming, setUpcoming] = useState([]);

  // Get upcoming waterings
  useEffect(() => {
    if (selectedPlant) {
      setUpcoming(getUpcoming(selectedPlant, plantSchedule));
    }
    return () => {
      setUpcoming([]);
    };
  }, [plantSchedule, selectedPlant]);

  if (!selectedPlant) {
    return null;
  }

  return (
    <Dialog
      open={plantOpen}
      onClose={handlePlantClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={classes.header}>
        <img src={plantImage} alt='potted plant' style={{ width: 150, height: 150 }} />
        <div className={classes.title}>
          <Typography variant='h4'>{selectedPlant.title}</Typography>
          <Typography variant='subtitle1'>
            Water every <span style={{ color: COLORS.blue }}>{selectedPlant.waterInfo}</span>
          </Typography>
        </div>
      </div>
      <Typography className={classes.scheduleHeader} variant='h6'>
        <ScheduleIcon /> Watering Schedule
      </Typography>
      <Divider variant='middle' />
      <Typography
        gutterBottom
        className={classes.upcomingCount}
      >{`${upcoming.length} upcoming`}</Typography>
      <DialogContent>
        {upcoming ? (
          <div className={classes.listBox}>
            <List dense>
              {upcoming.map(plant => (
                <ListItem key={plant.id}>
                  <ListItemIcon>
                    <ArrowIcon />
                  </ListItemIcon>
                  <ListItemText>{displayDate(plant.start)}</ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <Typography style={{ fontStyle: 'italic' }}>No upcoming waterings</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePlantClose} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
