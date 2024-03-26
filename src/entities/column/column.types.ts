export interface Column {
  board_id: number | null;
  id: number;
  name: string;
  task_ids: number[] | null;
}

export interface CreateColumnParams {
  name: string;
  board_id: number;
}

export interface DeleteColumnParams {
  id: number;
}
