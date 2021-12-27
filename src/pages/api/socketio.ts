import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/next';
import { Server } from 'socket.io';

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('new socket.io server');

    const io = new Server(res.socket.server as any);

    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected');
      socket.on('hello', (msg) => {
        socket.emit('hello', 'world!');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
