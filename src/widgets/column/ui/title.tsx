import React from 'react';

import { IoIosList } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';

interface TitleProps {
  name: string;
  id: number;
  handleRemoveColumn: (id: number) => void;
}

export const Title: React.FC<TitleProps> = ({ id, name, handleRemoveColumn }) => {
  return (
    <div className="column-title justify-between pr-2">
      <div className="flex-y-center gap-2">
        <IoIosList className="w-6" />
        <span>{name}</span>
      </div>

      <IoIosClose onClick={() => handleRemoveColumn(id)} className="cursor-pointer" />
    </div>
  );
};
