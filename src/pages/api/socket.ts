import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/next';
import { Server } from 'socket.io';

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server as any);

    io.on('connection', (socket) => {
      socket.broadcast.emit('a user connected', socket.rooms);
      socket.on('hello', (msg) => {
        socket.emit('hello', 'world!');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
