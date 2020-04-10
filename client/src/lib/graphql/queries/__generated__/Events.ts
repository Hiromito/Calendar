/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Events
// ====================================================

export interface Events_events {
  __typename: "Event";
  id: string;
  title: string;
  desc: string | null;
  start: any;
  end: any;
  isNew: boolean | null;
  allDay: boolean | null;
}

export interface Events {
  events: Events_events[];
}

export interface EventsVariables {
  user_id: string;
  date: any;
}
