export interface IUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface IEvent {
  id: string;
  title: string;
  start: Date,
  end: Date,
  desc: string,
  isNew?: boolean,
  allDay: boolean,
}

export interface CEvent {
  title: string;
  start: Date,
  end: Date,
  desc: string,
  isNew?: boolean,
  user_id: string,
  allDay: boolean,
}