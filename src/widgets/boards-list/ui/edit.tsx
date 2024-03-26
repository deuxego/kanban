import React from 'react';

interface EditProps {
  id: number;
  name: string;
  value: string | null;
  isEdit: number | null;
  setValue: (v: string) => void;
  setIsEdit: (id: number) => void;
  handleEdit: (v: string, id: number) => void;
}

export const Edit: React.FC<EditProps> = ({
  id,
  name,
  value,
  isEdit,
  setValue,
  setIsEdit,
  handleEdit
}) => {
  return (
    <div>
      {!(isEdit === id) && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(id);
          }}
        >
          {name}
        </span>
      )}

      {isEdit === id && (
        <input
          type="text"
          autoFocus
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => handleEdit(e.target.value, id)}
          value={value ?? name}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: `${name.length}ch` }}
          className="w-auto bg-inherit outline-none"
        />
      )}
    </div>
  );
};
