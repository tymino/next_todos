import ITodo from '../types/db';

const store: ITodo[] = [
  {
    id: 'item-1',
    isComplete: false,
    content: 'купить хлеб',
  },
  {
    id: 'item-2',
    isComplete: true,
    content: 'купить сыр',
  },
];

export default store;
