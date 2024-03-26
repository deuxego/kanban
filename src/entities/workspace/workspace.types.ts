export interface Workspace {
  board_ids: number[] | null;
  id: number;
  name: string;
  user_id: string | null;
}

export interface CreateWorkspaceParams {
  userId: string;
  name: string;
}

export interface DeleteWorkspaceParams {
  id: number;
}

export interface EditWorkspaceParams {
  id: number;
  name: string;
}
