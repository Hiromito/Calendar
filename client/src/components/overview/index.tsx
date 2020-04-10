import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Users_users } from '../../lib/graphql/queries/__generated__/Users';
import { Auth_auth } from '../../lib/graphql/queries/__generated__/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  collapsePosition: {
    position: 'absolute',
    background: 'white',
    width: '100%',
    zIndex: 1000,
  }
}));

interface Props {
  selectedUser: Auth_auth;
  users: Users_users[];
  handleChangeUser: any;
}

export const Overview = ({ selectedUser, users, handleChangeUser }: Props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  
  const handleClick = () => {
    setOpen(!open);
  };
  
  const handleUserSelect = (user: Auth_auth) => {
    handleChangeUser(user)
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Avatar src={selectedUser.avatar ? selectedUser.avatar : '' } alt={selectedUser.name} />
        </ListItemIcon>
        <ListItemText primary={selectedUser.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.collapsePosition}>
        <List component="div" disablePadding>
          {
            users.map((user, key) => 
              <ListItem button className={classes.nested} key={key} onClick={() => { handleUserSelect(user) }}>
                <ListItemIcon>
                  <Avatar src={user.avatar ? user.avatar : '' } alt={user.name} />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
            )
          }
        </List>
      </Collapse>
    </div>
  );
};