import { Server } from 'socket.io';
import Store from './db';

import EventName from '../types/EventName';
import ITodo from '../types/db';

const connectSocket = (server: any) => {
  const io = new Server(server);

  const updateClientTodos = (updatedStore: ITodo[]) => {
    io.emit(EventName.TODOS_UPDATE, updatedStore);
  };

  io.on(EventName.CONNECTION, (socket) => {
    socket.emit(EventName.TODOS_UPDATE, Store.getStore());

    socket.on(EventName.TODOS_ADD, (content: string) => {
      const updatedStore = Store.addItemToStore(content);
      updateClientTodos(updatedStore);
    });

    socket.on(EventName.TODOS_DONE, (index: string) => {
      const updatedStore = Store.updateStore(index);
      updateClientTodos(updatedStore);
    });

    socket.on(EventName.TODOS_REMOVE, (index: string) => {
      const updatedStore = Store.removeItemFromStore(index);
      updateClientTodos(updatedStore);
    });

    socket.on(EventName.TODOS_REORDER, (reorderItems: ITodo[]) => {
      const updatedStore = Store.reorderStore(reorderItems);
      updateClientTodos(updatedStore);
    });

    socket.on(EventName.TODOS_CLEAR_COMPLETED, () => {
      const updatedStore = Store.cleearCompleted();
      updateClientTodos(updatedStore);
    });
  });
};

export default connectSocket;
