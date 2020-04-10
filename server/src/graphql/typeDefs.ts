import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date
  scalar any

  type Event {
    id: ID!
    title: String!
    start: Date!
    end: Date!
    desc: String
    isNew: Boolean
    user_id: ID!
    allDay: Boolean
  }

  type User {
    id: ID!
    name: String!
    avatar: String
    email: String!
  }

  type Query {
    events(user_id: ID!, date: Date): [Event!]!
    users: [User!]!
    auth: User
  }

  type Mutation {
    deleteEvent(id: ID!): Boolean
    createEvent(event: any): Boolean
    updateEvent(event: any): Boolean
  }
`;