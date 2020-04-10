import { gql } from 'apollo-boost';

export const CREATE_EVENT = gql`
  mutation CreateEvent($event: any) {
    createEvent(event: $event)
  }
`
export const UPDATE_EVENT = gql`
  mutation UpdateEvent($event: any) {
    updateEvent(event: $event)
  }
`
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`