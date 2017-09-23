import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';
import { forumDataFetch } from '../services';

const defaultUserLocation = {
  lat: 0,
  lng: 0,
  caption: 'default',
  default: true,
};

const defaultHackableJson = {
  usermap_location: defaultUserLocation,
};

const UsermapLocationType = new GraphQLObjectType({
  name: 'UsermapLocation',
  description: 'User map location field',

  fields: () => ({
    lat: {
      type: GraphQLFloat,
      resolve: location => location.lat,
    },
    lng: {
      type: GraphQLFloat,
      resolve: location => location.lng,
    },
    caption: {
      type: GraphQLString,
      resolve: location => location.caption,
    },
    default: {
      type: GraphQLBoolean,
      resolve: location => !!location.default,
    },
  }),
});

const HackableJsonType = new GraphQLObjectType({
  name: 'HackableJson',
  description: 'Hackable JSON field',

  fields: () => ({
    usermapLocation: {
      type: UsermapLocationType,
      resolve: user => user.usermap_location,
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A FunFunForum User',

  fields: () => ({
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    hackableJson: {
      type: HackableJsonType,
      resolve: user => {
        try {
          return JSON.parse(user.hackable_json);
        } catch (error) {
          return defaultHackableJson;
        }
      },
    },
    profilePicture: {
      type: GraphQLString,
      resolve: user =>
        `https://cdn-standard6.discourse.org/user_avatar/www.funfunforum.com/${user.username}/90/149_1.png`,
    },
    profileUrl: {
      type: GraphQLString,
      resolve: user => `https://www.funfunforum.com/u/${user.username}/`,
    },
  }),
});

const UsersType = new GraphQLList(UserType);

const funFunSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'FunFunForum User API',

    fields: () => ({
      users: {
        type: UsersType,
        resolve: async () => {
          try {
            const { data } = await forumDataFetch();
            return data;
          } catch (error) {
            throw Error('Problem getting data from REST API');
          }
        },
      },
    }),
  }),
});

export default funFunSchema;
