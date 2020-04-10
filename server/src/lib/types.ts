import { Collection, ObjectId } from 'mongodb';

export interface IEvent {
  _id: ObjectId;
  title: string;
  start: Date,
  end: Date,
  desc: string,
  isNew?: boolean,
  user_id: ObjectId,
  allDay: boolean,
}

export interface CEvent {
  title: string;
  start: Date,
  end: Date,
  desc: string,
  isNew?: boolean,
  user_id: ObjectId,
  allDay: boolean,
}

export interface IUser {
  _id: ObjectId;
  name: string;
  avatar: string;
  email: string;
}

export interface Database {
  events: Collection<IEvent>;
  users: Collection<IUser>;
}
