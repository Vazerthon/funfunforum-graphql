import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

let getNextDefaultLocation;

const getNextDefaultHackableJson = error => {
  const defaultHackable = {
    usermap_location: {
      ...getNextDefaultLocation(),
    },
    error,
  };

  return defaultHackable;
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
      resolve: hackableJson => {
        if (!hackableJson.usermap_location) {
          return {
            ...getNextDefaultLocation(),
          };
        }
        return hackableJson.usermap_location;
      },
    },
    error: {
      type: GraphQLString,
      resolve: hackableJson => hackableJson.error,
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
          return {
            ...getNextDefaultHackableJson(error.message),
          };
        }
      },
    },
    profilePicture: {
      type: GraphQLString,
      resolve: user =>
        `https://discourse-cdn-sjc1.com/standard6/user_avatar/www.funfunforum.com/${user.username}/160/840_1.png`,
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
        resolve: async (obj, args, context) => {
          getNextDefaultLocation = context.lostSoulFactory().getNextLostSoul;

          try {
            const { data } = await context.forumDataFetch();
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
