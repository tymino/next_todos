import React from 'react';
import style from '../styles/components/ItemContainer.module.sass';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

import Item from './Item';

import ITodo from '../types/db';

interface IItemContainer {
  items: ITodo[];
  reorderTodos: (reorderItems: ITodo[]) => void;
  handleIsDoneTodo: (index: string) => void;
  handleRemoveTodo: (index: string) => void;
}

const ItemContainer: React.FC<IItemContainer> = ({ items, reorderTodos, handleIsDoneTodo, handleRemoveTodo }) => {
  const reorder = (list: ITodo[], startIndex: number, endIndex: number): ITodo[] => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);

    return list;
  };

  const getItemStyle = (draggableStyle: any, isDragging: boolean) => ({
    userSelect: 'none',
    ...draggableStyle,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const localItems: ITodo[] = reorder(items, result.source.index, result.destination.index);

    reorderTodos(localItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {items.map((item: ITodo, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                  <div>
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.dragHandleProps}
                      {...providedDraggable.draggableProps}
                      style={getItemStyle(
                        providedDraggable.draggableProps.style,
                        snapshotDraggable.isDragging,
                      )}>
                      <Item data={item} handleIsDoneTodo={handleIsDoneTodo} handleRemoveTodo={handleRemoveTodo} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ItemContainer;
