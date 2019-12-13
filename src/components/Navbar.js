import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import UpdateIcon from '@material-ui/icons/Update';

import COLORS from '../utils/colors';
import StartPicker from './StartPicker';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  updateIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [updateOpen, setUpdateOpen] = useState(true);

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
