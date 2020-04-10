/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  email: string;
}

export interface Users {
  users: Users_users[];
}
