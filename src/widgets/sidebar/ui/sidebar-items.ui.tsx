import { FC, ReactNode, useState } from 'react';
import { ContentType } from '../sidebar.types';
import { useWorkspaceCreate, useWorkspaceDelete, useWorkspaces } from 'entities/workspace';
import { useBoardCreate, useBoardDelete, useBoards } from 'entities/board';

import { LuKanban } from 'react-icons/lu';
import { MdWorkspaces } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  userId: string;
  contentType: ContentType;
}

interface CreateInput {
  icon: ReactNode;
  setIsCreating: (v: boolean) => void;
  handleCreate: (v: string) => void;
}

export const SidebarItems: FC<Props> = ({ contentType, userId }) => {
  const { workspaceId, boardId } = useParams();

  const navigate = useNavigate();

  // const { id: workspaceId } = useWorkspaceStore();

  // useState hooks
  const [hovered, setHovered] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // useQuery
  const { data: workspaces } = useWorkspaces(userId as string);
  const { data: boards } = useBoards(Number(workspaceId));

  // useQuery mutations fn
  const { mutate: createWorkspace } = useWorkspaceCreate();
  const { mutate: removeWorkspace } = useWorkspaceDelete();

  const { mutate: createBoard } = useBoardCreate(Number(workspaceId));
  const { mutate: removeBoard } = useBoardDelete(Number(workspaceId));

  // handle fn
  const handleCreate = (value: string) => {
    if (value.length > 1) {
      contentType === ContentType.BOARD
        ? createBoard({ name: value, workspace_id: Number(workspaceId) })
        : createWorkspace({ name: value, userId: userId as string });
    }
  };

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    contentType === ContentType.BOARD ? removeBoard({ id }) : removeWorkspace({ id });
  };

  // here we set items list
  const list = contentType === ContentType.BOARD ? boards : workspaces;

  const icon =
    contentType === ContentType.BOARD ? (
      <LuKanban className="sidebar-item-icon" />
    ) : (
      <MdWorkspaces className="sidebar-item-icon" />
    );

  const className = (id: number) => {
    return classNames('sidebar-item', {
      ['sidebar-item-active']:
        hovered === id || id === Number(workspaceId) || id === Number(boardId)
    });
  };

  const handleNavigate = (id: number) => {
    contentType === ContentType.BOARD
      ? navigate(`workspace/${workspaceId}/${contentType}/${id}`)
      : navigate(`/${contentType}/${id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* <Label contentType={contentType} /> */}

      <div className="sidebar-add-item" onClick={() => setIsCreating(true)}>
        <MdOutlineAdd />
        <span>Add {contentType}</span>
      </div>

      <div className="flex flex-col gap-2">
        {list &&
          list.map(({ name, id }) => (
            <div
              className={className(id)}
              onClick={() => handleNavigate(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              key={id}
            >
              <div className="flex-y-center gap-2">
                {icon}
                {name}
              </div>

              {hovered === id && <IoIosClose onClick={(e) => handleRemove(e, id)} />}
            </div>
          ))}
      </div>

      {isCreating && (
        <CreateInput icon={icon} handleCreate={handleCreate} setIsCreating={setIsCreating} />
      )}
    </div>
  );
};

const CreateInput: FC<CreateInput> = ({ icon, setIsCreating, handleCreate }) => {
  const create = (value: string) => {
    handleCreate(value);
    setIsCreating(false);
  };

  return (
    <div className="flex-y-center gap-2">
      {icon}
      <input
        autoFocus
        type="text"
        className="sidebar-item-input"
        onBlur={(e) => create(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const { value } = e.target as HTMLInputElement;
            create(value);
          }
        }}
      />
    </div>
  );
};

//* finish in future

// const Label = ({ contentType }: { contentType: ContentType }) => {
//   const text = `${contentType.at(0)?.toUpperCase() + contentType.slice(1)}s`;

//   return (
//     <div className="w-fit flex-center mb-5 px-3 py-1 font-semibold text-xl text-gray-400 border border-gray-500 rounded-[10px]">
//       {text}
//     </div>
//   );
// };
