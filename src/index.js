import webServer from './server';

const server = webServer({ host: '0.0.0.0', port: 3000, debug: true });
server.start();
