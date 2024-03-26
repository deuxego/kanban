import { useBoardCreate, useBoardDelete, useBoards } from 'entities/board';
import { useEffect, useState } from 'react';
import { LuKanban } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { GoX } from 'react-icons/go';
import { queryClient } from 'shared/consts';

export const BoardsList = () => {
  const navigate = useNavigate();

  const { workspaceId } = useParams();

  const { data: boards } = useBoards(Number(workspaceId));

  const { mutate: create } = useBoardCreate(Number(workspaceId));
  const { mutate: remove } = useBoardDelete(Number(workspaceId));

  const [hovered, setHovered] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateBoard = (value: string) => {
    if (value.length > 1) {
      create({ name: value, workspace_id: Number(workspaceId) });
    }
    setIsCreating(false);
  };

  const handleDeleteBoard = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    remove({ id });
  };

  const handleNavigateBoard = (id: number) => {
    navigate(`/workspace/${workspaceId}/board/${id}`);
  };

  useEffect(() => {
    if (workspaceId) {
      queryClient.invalidateQueries('boards');
    }
  }, [workspaceId]);

  return (
    <div className="flex gap-5 flex-wrap">
      {boards &&
        boards.map(({ id, name }) => (
          <div
            className="board-list-item"
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleNavigateBoard(id)}
            key={id}
          >
            <LuKanban />
            {name}
            {hovered === id && (
              <GoX className="absolute top-2 right-2" onClick={(e) => handleDeleteBoard(e, id)} />
            )}
          </div>
        ))}

      {isCreating && (
        <div className="board-list-item">
          <LuKanban />
          <input
            autoFocus
            onBlur={(e) => handleCreateBoard(e.target.value)}
            type="text"
            className="w-2/4 bg-inherit border-[.5px] border-gray-700 pl-2 outline-0"
          />
        </div>
      )}

      <div
        onClick={() => setIsCreating(true)}
        className="board-list-item text-gray-400 border-none bg-inherit shadow-v2"
      >
        + New board
      </div>
    </div>
  );
};
