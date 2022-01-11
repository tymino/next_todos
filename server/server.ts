import next from 'next';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import Store from './db';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const PORT = process.env.PORT || 3000;

  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.emit('todos:update', Store.getStore());

    socket.on('todos:add', (content: string) => {
      const updatedStore = Store.addItemToStore(content);
      io.emit('todos:update', updatedStore);
    });

    socket.on('todos:done', (index: string) => {
      const updatedStore = Store.updateStore(index);
      io.emit('todos:update', updatedStore);
    });

    socket.on('todos:remove', (index: string) => {
      const updatedStore = Store.removeItemFromStore(index);
      io.emit('todos:update', updatedStore);
    });
  });

  app.get('*', (req, res) => nextHandler(req, res));
  server.listen(PORT, () => console.log('Ready server.'));
});
