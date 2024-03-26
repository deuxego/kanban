import React from 'react';

interface CreateTaskInputProps {
  handleCreateTask: (v: string) => void;
}

export const CreateTaskInput: React.FC<CreateTaskInputProps> = ({ handleCreateTask }) => {
  return (
    <div className="task">
      <textarea
        rows={1}
        autoFocus
        onBlur={(e) => handleCreateTask(e.target.value)}
        className="bg-inherit outline-none pl-7 pr-3"
      />
    </div>
  );
};
