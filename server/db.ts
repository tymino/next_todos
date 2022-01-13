import ITodo from '../types/db';

class Store {
  private _store: ITodo[];

  constructor() {
    this._store = [];
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

  reorderStore(reorderedStore: ITodo[]) {
    this._store = reorderedStore;
    return this._store;
  }
}

export default new Store();
