import { useColumnCreate, useColumnDelete, useColumns } from 'entities/column';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'widgets/column';
import { CreateColumnInput } from './ui/create-column-input';
import { AddColumn } from './ui/add-column';

export const ColumnList = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { boardId } = useParams();

  const { data: columns } = useColumns(Number(boardId));

  const { mutate: create } = useColumnCreate(Number(boardId));
  const { mutate: remove } = useColumnDelete(Number(boardId));

  const handleCreateColumn = (value: string) => {
    setIsCreating(false);

    if (value.length >= 1) {
      create({ name: value, board_id: Number(boardId) });
    }
  };

  const handleRemoveColumn = (id: number) => {
    remove({ id });
  };

  return (
    <div className="flex items-start gap-8 max-w-[1150px] overflow-x-scroll scrollbar scroll-container">
      {columns &&
        columns.map(
          ({ name, id }) =>
            //* time
            String(id).length < 12 && (
              <Column columnId={id} name={name} key={id} handleRemoveColumn={handleRemoveColumn} />
            )
        )}

      {isCreating && <CreateColumnInput handleCreateColumn={handleCreateColumn} />}

      <div className="pr-[30px]">
        <AddColumn setIsCreating={setIsCreating} />
      </div>
    </div>
  );
};
