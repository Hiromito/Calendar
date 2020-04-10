import { gql } from 'apollo-boost';

export const USERS = gql`
  query Users {
    users {
      id
      name
      avatar
      email
    }
  }
`;

export const AUTH = gql`
  query Auth {
    auth {
      id
      name
      avatar
      email
    }
  }
`