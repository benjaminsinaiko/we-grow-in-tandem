import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import COLORS from '../utils/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ backgroundColor: COLORS.purple }}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            WeGrow
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
