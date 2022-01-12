import { Server } from 'socket.io';
import Store from './db';

const connectSocket = (server: any) => {
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
};

export default connectSocket;
