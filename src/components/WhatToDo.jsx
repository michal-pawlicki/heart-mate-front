import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import tabs from '../static/tabs';
import useWindowPosition from '../hook/useWindowPosition.js';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
const WhatToDo = () => {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="what-to-do">
      <ImageCard place={tabs[1]} checked={checked} />
      <ImageCard place={tabs[0]} checked={checked} />
    </div>
  );
}
export default WhatToDo;