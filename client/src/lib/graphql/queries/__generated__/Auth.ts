/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Auth
// ====================================================

export interface Auth_auth {
  __typename: "User";
  id: string;
  name: string;
  avatar: string | null;
  email: string;
}

export interface Auth {
  auth: Auth_auth | null;
}
