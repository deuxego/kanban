import { useTaskEdit } from 'entities/task';
import { handleDragStart } from 'features/task';
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { Edit } from 'shared/components';

interface TaskProps {
  id: number;
  name: string;
  columnId: number;
  handleRemoveTask: (id: number) => void;
}

export const Task: React.FC<TaskProps> = ({ id, name, columnId, handleRemoveTask }) => {
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const { mutate: edit } = useTaskEdit(columnId);

  const handleEdit = (v: string, id: number) => {
    setIsEdit(null);
    setValue(null);
    edit({ id, name: v });
  };

  const handleInitEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setIsEdit(id);
  };

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
        <div className="pl-7 w-[200px] break-words" onClick={(e) => handleInitEdit(e, id)}>
          <Edit
            id={id}
            name={name}
            value={value}
            setValue={setValue}
            isEdit={isEdit}
            handleEdit={handleEdit}
          />
        </div>
      </div>

      <div>
        <IoIosClose className="task-close" onClick={() => handleRemoveTask(id)} />
      </div>
    </div>
  );
};
