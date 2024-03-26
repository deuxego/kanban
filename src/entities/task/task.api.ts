import { supabase } from 'shared/lib';
import { CreateTaskParams, DeleteTaskParams, Task } from './task.types';

export const getTasks = async (columnId: number) => {
  return (
    await supabase
      .from('tasks')
      .select('*')
      .eq('column_id', columnId)
      .order('id', { ascending: true })
  ).data as Task[];
};

export const createTask = async (params: CreateTaskParams): Promise<Task> => {
  return (
    await supabase
      .from('tasks')
      .insert({ name: params.name, column_id: params.column_id })
      .select('*')
  ).data![0];
};

export const deleteTask = async (params: DeleteTaskParams): Promise<Task> => {
  return (await supabase.from('tasks').delete().eq('id', params.id).select('*')).data![0];
};
