import React from 'react';
import ReactDatePicker from 'react-datepicker';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useMutation } from '@apollo/react-hooks';
import {
  CreateEvent as CreateEventData,
  CreateEventVariables
} from '../../lib/graphql/mutations/__generated__/CreateEvent';
import { CREATE_EVENT } from '../../lib/graphql/mutations/eventMutation';
import {
  DeleteEvent as DeleteEventData,
  DeleteEventVariables
} from '../../lib/graphql/mutations/__generated__/DeleteEvent';
import { DELETE_EVENT } from '../../lib/graphql/mutations/eventMutation';
import {
  UpdateEvent as UpdateEventData,
  UpdateEventVariables
} from '../../lib/graphql/mutations/__generated__/UpdateEvent';
import { UPDATE_EVENT } from '../../lib/graphql/mutations/eventMutation';

const useStyles = makeStyles((theme) => ({
  content: {
    width: 500,
  },
  contain: {
    marginTop: 20,
    width: '100%'
  },
  dateLabel: {
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    padding: 40,
  },
  action: {
    paddingBottom: 30,
  }
}));

interface Props {
  eventId: string;
  open: boolean;
  title: string;
  desc: string;
  fromTo: {start: Date, end: Date};
  user_id: string;
  allDay: boolean;
  refetch: any;
  handleValUpdate: any;
  handleCloseModal: any;
  handleChangeTitle: any;
  handleChangeDesc: any;
  handleChangeAllDay: any;
}
export const EventModal = ({
  open,
  fromTo,
  refetch,
  user_id,
  title,
  desc,
  eventId,
  allDay,
  handleValUpdate,
  handleCloseModal,
  handleChangeTitle,
  handleChangeDesc,
  handleChangeAllDay,
}: Props) => {
  const classes = useStyles();
  
  const [ createEvent ] = useMutation<CreateEventData, CreateEventVariables>(CREATE_EVENT);
  const [ updateEvent ] = useMutation<UpdateEventData, UpdateEventVariables>(UPDATE_EVENT);
  const [ deleteEvent ] = useMutation<DeleteEventData, DeleteEventVariables>(DELETE_EVENT);

  const handleClose = () => {
    handleCloseModal(false)
  };

  const handleSubmit = async () => {
    const event:any = !!eventId ? {
      id: eventId,
      title,
      desc,
      user_id,
      start: fromTo.start,
      end: fromTo.end,
      isNew: false,
      allDay: allDay
    } : {
      title,
      desc,
      user_id,
      start: fromTo.start,
      end: fromTo.end,
      isNew: true,
      allDay: allDay
    };
    if (!!eventId) {
      await updateEvent({ variables: { event: event } });
    } else {
      await createEvent({ variables: { event: event } });
    }
    handleCloseModal(false)
    refetch()
  }
  const handleDelete = async () => {
    await deleteEvent({ variables: { id: eventId}})
    handleCloseModal(false)
    refetch()
  }
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Schedule Set</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <TextField
          className={classes.contain}
          id="outlined-multiline-flexible"
          label="Schedule Title"
          multiline
          rowsMax="2"
          value={title}
          onChange={handleChangeTitle}
          variant="outlined"
        />
        <TextField
          className={classes.contain}
          id="outlined-multiline-flexible"
          label="Schedule Description"
          multiline
          rows="5"
          value={desc}
          onChange={handleChangeDesc}
          variant="outlined"
        />
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <div className={classes.dateLabel}>State Time</div>
            <ReactDatePicker
              className="form-control"
              selected={fromTo.start}
              onChange={(date: Date) => handleValUpdate("start", date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <div className={classes.dateLabel}>End Time</div>
            <ReactDatePicker
              className="form-control"
              selected={fromTo.end}
              onChange={(date: Date) => handleValUpdate('end', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Grid>
          <Grid item xs={3}>
            <div className={classes.dateLabel} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={allDay}
                  onChange={handleChangeAllDay}
                  name="checkedDay"
                  color="primary"
                />
              }
              label="AllDay"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={() => handleClose()}  color="secondary">
          Close
        </Button>
        { !!eventId &&
          <Button onClick={() => handleDelete()}  color="secondary">
            Remove
          </Button>
        }
        <Button onClick={() => handleSubmit()} color="primary">
          Update and Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}