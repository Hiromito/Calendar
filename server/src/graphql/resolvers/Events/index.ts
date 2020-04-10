import { IResolvers } from 'apollo-server-express';
import { Database, IEvent, CEvent, IUser } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export const eventResolvers: IResolvers = {
  Query: {
    events: async (
      _root: undefined,
      { user_id, date }: { user_id: string, date: Date },
      { db }: { db: Database }
    ): Promise<IEvent[]> => {
      const currentDate:Date = new Date(date);
      const firstDay:Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay:Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const events = await db.events.find({user_id: new ObjectId(user_id), start: {"$gte": firstDay, "$lt": lastDay}}).toArray()
      return events
    },
  },
  Mutation: {
    createEvent: async (
      _root: undefined,
      { event }: { event: any },
      { db }: { db: Database }
    ): Promise<Boolean> => {
      const temp:IEvent = {
        ...event,
        user_id: new ObjectId(event.user_id),
        start: new Date(event.start),
        end: new Date(event.end)
      }
      const newEvent = await db.events.insertOne(temp);
      if (!newEvent) {
        throw new Error('failed to update Event')
      }
      return true
    },
    updateEvent: async (
      _root: undefined,
      { event }: { event: any },
      { db }: { db: Database }
    ): Promise<Boolean> => {
      const req:CEvent = {
        title: event.title,
        desc: event.desc,
        start: new Date(event.start),
        end: new Date(event.end),
        isNew: false,
        user_id: new ObjectId(event.user_id),
        allDay: event.allDay
      }
      const newEvent = db.events.updateOne({_id: new ObjectId(event.id)}, {$set: {...req}}, { upsert: true})
      if (!newEvent) {
        throw new Error('failed to update Event')
      }
      return true
    },
    deleteEvent: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Boolean> => {
      const deleteRes = await db.events.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete Event');
      }
      
      return true
    },
    
  },
  Event: {
    id: (event: IEvent): string => event._id.toString(),
    user_id: (event: IEvent): string => event.user_id.toString()
  }
};
