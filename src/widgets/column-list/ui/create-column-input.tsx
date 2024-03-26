import React from 'react';
import { IoIosList } from 'react-icons/io';

interface CreateColumnInputProps {
  handleCreateColumn: (v: string) => void;
}

export const CreateColumnInput: React.FC<CreateColumnInputProps> = ({ handleCreateColumn }) => {
  return (
    <div className="column-title gap-1">
      <IoIosList className="w-6" />
      <input
        type="text"
        onBlur={(e) => handleCreateColumn(e.target.value)}
        className="w-[250px] pl-1 bg-inherit"
        autoFocus
      />
    </div>
  );
};
