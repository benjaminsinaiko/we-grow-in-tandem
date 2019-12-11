import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import plantImage from '../img/plant.png';

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
  }
}));

export default function PlantInfo({ plantOpen, handlePlantClose, selectedPlant }) {
  const classes = useStyles();
  console.log(selectedPlant);

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
          <Typography
            variant='subtitle1'
            color='primary'
          >{`Water every ${selectedPlant.waterInfo}`}</Typography>
        </div>
      </div>
      <DialogTitle id='alert-dialog-title'>{'Watering schedule'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>Dec 16th</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePlantClose} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
