import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useQuery } from '@apollo/react-hooks';

import { Users as UsersData } from '../../lib/graphql/queries/__generated__/Users';
import { USERS } from '../../lib/graphql/queries/userQuery';

import { Auth_auth } from '../../lib/graphql/queries/__generated__/Auth';

import { Overview, RCalendar } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 930,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 300
  }
}));

interface Props {
  currentUser: Auth_auth;
}

export const Home = ({currentUser}: Props) => {
  const { data, loading, error } = useQuery<UsersData>(USERS);
  
  const [selectedUser, setSelectedUser] = useState(currentUser);

  const classes = useStyles();
  const users = data ? data.users : null;
  
  if (loading || !users) {
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

  const handleChangeUser = (selectedUser: Auth_auth) => {
    setSelectedUser(selectedUser)
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Overview selectedUser={selectedUser} users={users} handleChangeUser={handleChangeUser} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <RCalendar user_id={selectedUser.id}  />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
