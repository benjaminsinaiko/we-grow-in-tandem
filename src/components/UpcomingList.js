import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function PlantInfo({ selectedPlant }) {
  const classes = useStyles();
  // console.log('from UPCOMINGLIST', selectedPlant);

  return (
    <div>
      <h1>List</h1>
    </div>
  );
}
