import ITodo from '../types/db';

class Store {
  private _store: ITodo[];

  constructor(items: ITodo[]) {
    this._store = [...items];
  }

  getStore() {
    return this._store;
  }

  addItemToStore(content: string) {
    this._store.push({
      id: `item-${this._store.length + 1}`,
      isComplete: false,
      content,
    });

    return this._store;
  }

  updateStore(index: string) {
    const newStore = this._store.map((item) => {
      if (item.id === index) return { ...item, isComplete: true };

      return item;
    });

    this._store = newStore;

    return this._store;
  }

  removeItemFromStore(index: string) {
    const newStore = this._store.filter((item) => item.id !== index);
    this._store = newStore;

    return this._store;
  }
}

export default new Store([
  {
    id: 'item-1',
    isComplete: true,
    content:
      'Complete online JavaScript course Complete online JavaScript course Complete online JavaScript course',
  },
  {
    id: 'item-2',
    isComplete: false,
    content: 'Jog around the park 3x',
  },
  {
    id: 'item-3',
    isComplete: false,
    content: '10 minutes meditation',
  },
  {
    id: 'item-4',
    isComplete: false,
    content: 'Read for 1 hour',
  },
  {
    id: 'item-5',
    isComplete: false,
    content: 'Pick up groceries',
  },
  {
    id: 'item-6',
    isComplete: false,
    content: 'complete Todo App on Frontend Mentor',
  },
]);
