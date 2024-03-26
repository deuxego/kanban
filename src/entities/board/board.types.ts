export interface Board {
  column_ids: number[] | null;
  id: number;
  name: string;
  workspace_id: number | null;
}

export interface CreateBoardParams {
  name: string;
  workspace_id: number;
}

export interface EditBoardParams {
  id: number;
  name: string;
}

export interface DeleteBoardParams {
  id: number;
}
