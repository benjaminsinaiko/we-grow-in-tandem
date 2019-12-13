import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
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
import { displayInfoDate } from '../utils/dateHelpers';
import plantImage from '../img/plant.png';
import COLORS from '../utils//colors';
import AdjustDay from './ChangeDate';

const useStyles = makeStyles(theme => ({
  dialogBox: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1, 8)
    }
  },
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
    display: 'flex',
    alignItems: 'center',
    '& span:nth-child(2)': {
      backgroundColor: COLORS.blue
    }
  },
  dateChangeBox: {
    width: '60%',
    margin: 'auto',
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 10
  },
  dateChangeControl: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    margin: theme.spacing(2)
  },
  listBox: {
    maxHeight: '25vh'
  }
}));

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
      <AdjustDay selectedPlant={selectedPlant} />
      <div className={classes.dialogBox}>
        <div className={classes.header}>
          <img src={plantImage} alt='potted plant' style={{ width: 150, height: 150 }} />
          <div className={classes.title}>
            <Typography variant='h4'>{selectedPlant.title}</Typography>
            <Typography variant='subtitle1'>
              Water every <span style={{ color: COLORS.blue }}>{selectedPlant.waterInfo}</span>
            </Typography>
          </div>
        </div>
        <div className={classes.scheduleHeader}>
          <Badge className={classes.badge} badgeContent={upcoming.length} color='primary'>
            <ScheduleIcon />
          </Badge>
          <Typography variant='h6'>Watering Schedule</Typography>
        </div>
        <Divider variant='middle' />
        <DialogContent>
          {upcoming ? (
            <div className={classes.listBox}>
              <List dense>
                {upcoming.map(plant => (
                  <ListItem key={plant.id}>
                    <ListItemIcon>
                      <ArrowIcon />
                    </ListItemIcon>
                    <ListItemText>{displayInfoDate(plant.start)}</ListItemText>
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
      </div>
    </Dialog>
  );
}
