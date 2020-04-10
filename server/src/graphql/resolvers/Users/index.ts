import { IResolvers } from 'apollo-server-express';
import { Database, IUser } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export const userResolvers: IResolvers = {
  Query: {
    users: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<IUser[]> => await db.users.find({}).toArray(),
    auth: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<IUser> => {
      const auth = await db.users.find({email: 'hiromi.ito.216@gmail.com'}).toArray()
      return auth[0]
    },
  },
  User: {
    id: (user: IUser): string => user._id.toString()
  }
};