export interface Task {
  column_id: number | null;
  id: number;
  name: string;
}

export interface CreateTaskParams {
  name: string;
  column_id: number;
}

export interface DeleteTaskParams {
  id: number;
}

export interface MoveTask {
  taskId: number;
  value: string;
  sourceColumnId: number;
  targetColumnId: number;
}
