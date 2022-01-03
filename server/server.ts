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

  io.on('connect', (socket: any) => {
    socket.join('public');
    socket.emit('now', { message: 'server Next test' });

    socket.on('room', (roomName: string) => {
      socket.leave('public');
      socket.join(roomName);
    });

    socket.on('test', (data: any) => {
      io.emit('test', data);

      const strTest = 'QQ ' + data;
      socket.to("private").emit('test', strTest);
    });
  });

  app.get('*', (req: any, res: any) => {
    return nextHandler(req, res);
  });

  server.listen(PORT, () => {
    console.log('Ready server.');
  });
});
