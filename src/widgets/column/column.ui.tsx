import { useMoveTask, useTaskCreate, useTaskDelete, useTasks } from 'entities/task';
import { FC, useState } from 'react';

import { Task } from './ui/task';
import { CreateTaskInput } from './ui/create-task-input';
import { DropZone } from './ui/drop-zone';
import { Title } from './ui/title';
import { handleDragOver, handleDrop } from 'features/task';

interface ColumnProps {
  columnId: number;
  name: string;
  handleRemoveColumn: (id: number) => void;
}

export const Column: FC<ColumnProps> = ({ columnId, name, handleRemoveColumn }) => {
  const [isCreating, setIsCreating] = useState(false);

  const { data: tasks } = useTasks(columnId);

  const { mutate: create } = useTaskCreate(columnId);
  const { mutate: remove } = useTaskDelete(columnId);

  const { mutate } = useMoveTask();

  const handleCreateTask = (value: string) => {
    setIsCreating(false);

    if (value.length > 1) {
      create({ name: value, column_id: columnId });
    }
  };

  const handleRemoveTask = (id: number) => {
    remove({ id });
  };

  return (
    <div
      className="column flex flex-col gap-3"
      id={String(columnId)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, mutate)}
    >
      <Title id={columnId} name={name} handleRemoveColumn={handleRemoveColumn} />

      <div className="flex flex-col gap-3">
        {tasks &&
          tasks.map(({ id, name }) => (
            <Task
              id={id}
              columnId={columnId}
              name={name}
              key={id}
              handleRemoveTask={handleRemoveTask}
            />
          ))}
      </div>

      <DropZone tasks={tasks} />

      {isCreating && <CreateTaskInput handleCreateTask={handleCreateTask} />}

      <div className="add-task" onClick={() => setIsCreating(true)}>
        + Add task
      </div>
    </div>
  );
};
