import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EventModal } from '../modal/eventModal';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { useQuery } from '@apollo/react-hooks';
import { EVENTS } from '../../lib/graphql/queries/eventQuery';
import {
  Events as EventsData,
  EventsVariables
} from '../../lib/graphql/queries/__generated__/Events';
import { Events_events } from '../../lib/graphql/queries/__generated__/Events';



const localizer = momentLocalizer(moment);
const useStyles = makeStyles((theme) => ({
  root: {
    height: 900,
    padding: 20
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 300
  }
}));

interface Props {
  user_id: string;
}

export function RCalendar ({user_id}: Props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [fromTo, setDateTime] = useState({ start: new Date(), end: new Date() });
  const [initialTitle, setInitialTitle] = useState('')
  const [initialDesc, setInitialDesc] = useState('')
  const [eventId, setEventId] = useState('')
  const [allDay, setAllDay] = useState(false)

  const { data, loading, error, refetch } = useQuery<EventsData, EventsVariables>(EVENTS, {
    variables: { user_id, date}
  })

  const classes = useStyles();

  const Event = data ? data.events : []
  const events:Events_events[] = []
  Event.forEach(event => {
    const temp:Events_events = {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }
    events.push(temp)
  })
  const handleNavigate = async (newDate: Date) => {
    setDate(newDate)
  }

  const handleEventSelect = async (event: Events_events) => {
    const { id, start, end, title, desc, allDay } = event
    const initDesc = desc ? desc : ''
    const initAllDay = allDay ? allDay : false
    setEventId(id)
    setDateTime({start, end})
    setInitialTitle(title)
    setInitialDesc(initDesc)
    setAllDay(initAllDay)
    setOpen(true)
  }

  const handleSelectSlot = (event: any) => {
    const { start, end } = event
    setDateTime({start, end})
    setEventId('')
    setInitialTitle('')
    setInitialDesc('')
    setAllDay(false)
    setOpen(true)
  }

  const handleCloseModal = (open: boolean) => {
    setOpen(open)
  }

  const handleValUpdate = (type: string, date: Date) => {
    if (type === 'start') {
      setDateTime({
        ...fromTo,
        start: date
      })
    } else {
      setDateTime({
        ...fromTo,
        end: date
      })
    }
  }
  const handleChangeTitle = (event:any) => {
    setInitialTitle(event.target.value)
  }
  const handleChangeDesc = (event:any) => {
    setInitialDesc(event.target.value)
  }
  const handleChangeAllDay = () => {
    setAllDay(!allDay)
  }
  if (loading) {
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
  return (
    <div className={classes.root}>
      <EventModal
        open = { open }
        user_id = { user_id }
        fromTo = { fromTo }
        refetch = { refetch }
        title = { initialTitle }
        desc = { initialDesc }
        eventId = { eventId }
        allDay = { allDay }
        handleCloseModal = { handleCloseModal }
        handleValUpdate = { handleValUpdate }
        handleChangeTitle = { handleChangeTitle }
        handleChangeDesc = { handleChangeDesc }
        handleChangeAllDay = { handleChangeAllDay }
      />
      <Calendar
        date={date}
        events={events}
        step={30}
        selectable={true}
        defaultView="month"
        views={['month', 'week']}
        localizer={localizer}
        onNavigate={handleNavigate}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
}