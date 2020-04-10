import { gql } from 'apollo-boost';

export const EVENTS = gql`
  query Events($user_id: ID!, $date: Date!) {
    events(user_id: $user_id, date: $date) {
      id
      title
      desc
      start
      end
      isNew
      allDay
    }
  }
`