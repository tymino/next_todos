interface ITodo {
  id: number;
  isComplete: boolean;
  content: string;
}

const store: ITodo[] = [
  {
    id: 0,
    isComplete: false,
    content: 'купить хлеб',
  },
  {
    id: 1,
    isComplete: false,
    content: 'купить сыр',
  },
];

export default store;
