import { IEvent, IUser } from '../src/lib/types';

const ObjectId = require('mongodb').ObjectID

export const users: IUser[] = [
  {
    _id: ObjectId('5d378db94e84753160e08b55'),
    name: 'Hiromi Ito',
    avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQEd0vmZAKAjBg/profile-displayphoto-shrink_100_100/0?e=1591833600&v=beta&t=HWAMEKDiYeRxdhQJaQ1Lbs9C0n9dl4f0ZE5qkkOuJIE",
    email: 'hiromi.ito.216@gmail.com'
  },
  {
    _id: ObjectId('5d378db94e84753160e08b56'),
    name: 'Daniel Doe',
    avatar: "https://i.imgur.com/38KuJvQ.png",
    email: 'example@gmail.com'
  },
  {
    _id: ObjectId('5d378db94e84753160e08b57'),
    name: 'John Doe',
    avatar: "https://media-exp1.licdn.com/dms/image/C5603AQG6kMBTeH45uQ/profile-displayphoto-shrink_100_100/0?e=1591833600&v=beta&t=FDQ3IP6oNvoPOGF19hHPjQW-44FtvkKo_ek9NQ7Dlhs",
    email: 'test@gmail.com'
  }
];
