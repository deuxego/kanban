import { Task } from 'entities/task';
import React from 'react';

interface DropZoneProps {
  tasks: Task[] | undefined;
}

export const DropZone: React.FC<DropZoneProps> = ({ tasks }) => {
  return !tasks || (tasks!.length === 0 && <div className="drop-zone mt-[-12px]">Drop zone</div>);
};
