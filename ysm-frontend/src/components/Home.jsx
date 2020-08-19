import React from 'react';

import {
  Button, makeStyles, Typography, Box, Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import illustration from '../assets/homepage-illustration.png';

import useWindowDimensions from '../shared/dimensions';

const useStyles = makeStyles({
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  iconContainer: {
    backgroundColor: '#dadded',
    width: '100%',
    height: '100%',
  },
});

const Home = () => {
  const { width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height={1}
      justifyContent="center"
      alignItems="center"
    >
      <Box width={width * 0.5} height={width * 0.5} p={4}>
        <Avatar className={classes.iconContainer} alt="Illustration of woman and a butterfly" src={illustration} />
      </Box>
      <Typography variant="h1" align="center">Your Story Matters</Typography>
      <Typography align="center">
        If you&apos;ve been treated in a way that has made you feel uncomfortable or violated,
        let YSM be your companion because your story matters.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/your-journey">
        Start your journey
      </Button>
      <Box width="50%">
        <Typography align="center" variant="subtitle2" color="textSecondary">
          If you&apos;re in crisis call the emergency services
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
