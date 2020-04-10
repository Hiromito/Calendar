import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './sections';
import { Header } from './components';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useQuery } from '@apollo/react-hooks';
import { Auth as AuthData } from './lib/graphql/queries/__generated__/Auth';
import { AUTH } from './lib/graphql/queries/userQuery';

const useStyles = makeStyles((theme) => ({
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 300
  }
}));

export default function App() {
  const { data, loading, error } = useQuery<AuthData>(AUTH);
  const classes = useStyles();

  const currentUser = data ? data.auth : null;

  if (loading || !currentUser) {
    return (
      <div className={classes.center}>
        <CircularProgress disableShrink />
      </div>
    )
  }
  if (error) {
    return (
      <div className={classes.center}>
        <Alert variant="filled" severity="error">
          Uh oh! Something went wrong - please try again later :(
        </Alert>
      </div>
    )
  }
  const Calendar = () => {
    return (
      <Home currentUser={currentUser} />
    )
  }
  return (
    <>
      <Header currentUser={currentUser} />
      <Router>
        <Switch>
          <Route exact path='/' component={Calendar} />
        </Switch>
      </Router>
    </>
  );
};
