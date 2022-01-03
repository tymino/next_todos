import next from 'next';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const PORT = process.env.PORT || 3000;

  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.emit('now', { message: 'server Next test' });

    socket.on('test', (data) => {
      io.emit('test', data);
    });
  });

  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(PORT, () => {
    console.log('Ready server.');
  });
});
