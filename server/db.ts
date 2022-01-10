import ITodo from '../types/db';

const store: ITodo[] = [
  {
    id: 'item-1',
    isComplete: true,
    content: 'Complete online JavaScript course',
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
];

export default store;
