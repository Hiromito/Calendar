require('dotenv').config();
import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    console.log('[clear] : running...');

    const db = await connectDatabase();

    const events = await db.events.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (events.length > 0) {
      await db.events.drop();
    }

    if (users.length > 0) {
      await db.users.drop();
    }

    console.log('[clear] : success!');
  } catch (error) {
    throw new Error(`Failed to clear database: ${error}`);
  }
};

clear();
