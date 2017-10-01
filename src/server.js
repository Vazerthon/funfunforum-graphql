import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';
import { funFunSchema } from './schema';
import { forumDataFetch, lostSoulFactory } from './services';

const webServer = ({ host, port, debug }) => {
  const server = new hapi.Server();
  server.connection({
    host,
    port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  if (debug) {
    server.register({
      register: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/funfunforum',
        },
      },
    });
  }

  server.register([
    {
      register: graphqlHapi,
      options: {
        path: '/funfunforum',
        graphqlOptions: {
          schema: funFunSchema,
          context: {
            forumDataFetch,
            lostSoulFactory,
          },
        },
      },
    },
  ]);

  return server;
};

export default webServer;
