import merge from 'lodash.merge';
import { eventResolvers } from './Events';
import { userResolvers } from './Users';

export const resolvers = merge(eventResolvers, userResolvers);