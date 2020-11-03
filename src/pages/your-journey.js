import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,

  CardMedia,

  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LinkUi from '@material-ui/core/Link';
import { ArrowBack, Search } from '@material-ui/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import SearchModal from '../components/SearchModal';
import SignUpPrompt from '../components/SignUpPrompt';
import firebase from '../config/firebase';
import isBrowser from '../shared/browserCheck';
import richTextHelper from '../shared/rich-text';
import { axiosGet } from '../store/axios';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  card: {
    height: 340,
    margin: 6,
  },
  cardMedia: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 14,
    paddingLeft: 14,
    paddingBottom: 0,
    paddingTop: 26,

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

const YourJourney = ({ propThemes, container }) => {
  const classes = useStyles();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const previewMode = useSelector((state) => state.user.previewMode);
  const [user] = isBrowser ? useAuthState(firebase.auth()) : [{}];
  const [themes, setThemes] = useState(propThemes);

  useEffect(() => {
    if (previewMode) {
      axiosGet('themes', {
        headers: {
          'X-PREVIEW-MODE': 'preview',
          authorization: `Bearer ${user.xa}`,
        },
      }).then((allThemes) => { setThemes(allThemes); });
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      direction="column"
      pt={3.5}
      px={2}
    >
      {themes
        ? (
          <>
            <Grid container justify="space-between" direction="row">
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="/" passHref>
                  <LinkUi component="a" color="inherit">
                    <Box display="flex" alignItems="center">
                      <ArrowBack className={classes.icon} />
                    </Box>
                  </LinkUi>
                </Link>

              </Breadcrumbs>
              <IconButton component="a" onClick={() => { setShowSearchModal(true); }}>
                <Search />
              </IconButton>
              <SearchModal
                shown={showSearchModal}
                container={container}
                closeModal={() => { setShowSearchModal(false); }}
              />

            </Grid>

            <Typography variant="h1" align="center" color="secondary.dark">Your Journey</Typography>
            <Typography align="center">
              Browse accessible resources curated by a team of survivors.
              Save what you love and come back anytime.
            </Typography>
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={classes.card}
                variant="outlined"
              >
                <Link href="/themes/[slug]" as={`/themes/${theme.slug}`}>
                  <CardActionArea component="a">
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h2" align="center" color="textSecondary">
                        {theme.title}
                      </Typography>
                      <Typography align="center">
                        {richTextHelper(theme.description)}
                      </Typography>
                      {theme.image
                        ? (
                          <CardMedia
                            height="200"
                            component="img"
                            image={theme.image.filename}
                          />
                        ) : null }
                    </CardContent>

                  </CardActionArea>
                </Link>
              </Card>
            ))}

            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/" passHref>
                <LinkUi component="a" color="inherit">
                  <Box display="flex" alignItems="center">
                    <ArrowBack className={classes.icon} />
                    Back to Home
                  </Box>
                </LinkUi>
              </Link>

            </Breadcrumbs>
            <SignUpPrompt url="/" />
          </>
        )
        : null }
    </Box>
  );
};

export async function getServerSideProps({ preview }) {
  let propThemes = null;
  if (!preview) {
    propThemes = await axiosGet('themes');
  }

  return { props: { propThemes } };
}

YourJourney.propTypes = {
  container: PropTypes.objectOf(PropTypes.any).isRequired,
  propThemes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
    ),
  ),
};

YourJourney.defaultProps = {
  propThemes: [],
};

export default YourJourney;
