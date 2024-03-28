/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, ReactNode, useState } from 'react';
import { ContentType } from '../sidebar.types';
import {
  SharedWorkspace,
  Workspace,
  useSharedWorkspaces,
  useWorkspaceCreate,
  useWorkspaceDelete,
  useWorkspaceEdit,
  useWorkspaces
} from 'entities/workspace';
import { useBoardCreate, useBoardDelete, useBoardEdit, useBoards } from 'entities/board';

import { LuKanban } from 'react-icons/lu';
import { MdWorkspaces } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { MdGroup } from 'react-icons/md';

import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit } from 'shared/components';

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
  const [value, setValue] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<number | null>(null);

  // useQuery
  const { data: workspaces } = useWorkspaces(userId as string);
  const { data: sharedWorkspaces } = useSharedWorkspaces(userId as string);
  const { data: boards } = useBoards(Number(workspaceId));

  // useQuery mutations fn
  const { mutate: createWorkspace } = useWorkspaceCreate();
  const { mutate: removeWorkspace } = useWorkspaceDelete();
  const { mutate: editWorkspace } = useWorkspaceEdit();

  const { mutate: createBoard } = useBoardCreate(Number(workspaceId));
  const { mutate: removeBoard } = useBoardDelete(Number(workspaceId));
  const { mutate: editBoard } = useBoardEdit(Number(workspaceId));
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

  const handleInitEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setIsEdit(id);
  };

  const handleEdit = (v: string, id: number) => {
    setIsEdit(null);

    contentType == ContentType.BOARD ? editBoard({ name: v, id }) : editWorkspace({ name: v, id });
  };

  // here we set items list
  const list =
    contentType === ContentType.BOARD
      ? boards
      : //* here i append own workspaces and shared
        [
          ...((workspaces as Workspace[]) ?? []),
          ...((sharedWorkspaces as SharedWorkspace[]) ?? [])
        ];

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
          //@ts-ignore //! solved in future
          list.map(({ name, id, shared }) => (
            <div
              className={className(id)}
              onClick={() => handleNavigate(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              key={id}
            >
              <div className="flex-y-center gap-2">
                {shared ? <MdGroup /> : icon}
                <Edit
                  id={id}
                  name={name}
                  value={value}
                  isEdit={isEdit}
                  setValue={setValue}
                  handleEdit={handleEdit}
                />
              </div>

              {!shared && (
                <div className="flex-y-center gap-1">
                  {hovered === id && <MdEdit onClick={(e) => handleInitEdit(e, id)} />}
                  {hovered === id && (
                    <IoIosClose className="w-6 h-6" onClick={(e) => handleRemove(e, id)} />
                  )}
                </div>
              )}
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
