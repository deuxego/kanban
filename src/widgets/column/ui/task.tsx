import { handleDragStart } from 'features/task';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface TaskProps {
  id: number;
  name: string;
  handleRemoveTask: (id: number) => void;
}

export const Task: React.FC<TaskProps> = ({ id, name, handleRemoveTask }) => {
  return (
    <div
      className="task"
      data-value={name}
      key={id}
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
    >
      <div className="flex-y-center gap-1 relative">
        <RxDragHandleDots2 className="task-icon" />
        <div className="pl-7 w-[200px] break-words">{name}</div>
      </div>

      <IoIosClose className="task-close" onClick={() => handleRemoveTask(id)} />
    </div>
  );
};
