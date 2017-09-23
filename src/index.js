import webServer from './server';

const server = webServer({ host: 'localhost', port: 3000, debug: true });
server.start();
