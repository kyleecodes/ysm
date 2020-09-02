import React from 'react';

import {
  makeStyles,
  Typography,
  Box,
  Button,
  Avatar,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import useWindowDimensions from '../shared/dimensions';

import smallIllustration from '../assets/resource-illustration.png';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    height: 200,
    margin: 6,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    boxShadow: 'inset 0 0 0 1000px rgba(36, 42, 74, 0.3)',
  },
  iconContainer: {
    backgroundColor: '#EADED6',
    width: '100%',
    height: '100%',
  },
  link: {
    color: '#D27200',
  },
  linkSubtitle: {
    margin: 0,
  },
}));

const SignUpPrompt = () => {
  const classes = useStyles();
  const { width } = useWindowDimensions();

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      className={classes.container}
      pt={3.5}
      px={2}
    >
      <Box
        display="flex"
        flexDirection="column"
        height={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box width={width * 0.3} height={width * 0.3} p={4}>
          <Avatar className={classes.iconContainer} alt="Illustration of woman and a butterfly" src={smallIllustration} />
        </Box>
        <Typography variant="h1" align="center">Sign up, it’s free</Typography>
        <Typography align="center">
          Sign up to Your Story Matters and privately save resources for later.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/signin">
          Create Your Account
        </Button>
        <Box width="50%" display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" variant="subtitle1" className={classes.linkSubtitle}>
            Your privacy will be protected.
          </Typography>
          <Link
            component={RouterLink}
            className={classes.link}
            underline="always"
            to="/"
            variant="subtitle1"
            align="center"
          >
            Read our Terms & Privacy Policy
          </Link>
        </Box>
      </Box>

    </Box>
  );
};

export default SignUpPrompt;