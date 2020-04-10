import { MongoClient } from 'mongodb';
import { Database, IEvent, IUser } from '../lib/types';

const url = `mongodb://127.0.0.1:27017`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('calendar');

  return {
    events: db.collection<IEvent>('events'),
    users: db.collection<IUser>('users'),
  };
};
