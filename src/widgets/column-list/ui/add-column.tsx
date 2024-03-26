import React from 'react';

interface AddColumnProps {
  setIsCreating: (v: boolean) => void;
}

export const AddColumn: React.FC<AddColumnProps> = ({ setIsCreating }) => {
  return (
    <div onClick={() => setIsCreating(true)} className="column-title text-gray-400 cursor-pointer text-nowrap">
      + Add column
    </div>
  );
};
