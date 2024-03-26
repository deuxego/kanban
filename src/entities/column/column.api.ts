import { supabase } from 'shared/lib';
import { Column, CreateColumnParams, DeleteColumnParams } from './column.types';

export const getColumns = async (boardId: number) => {
  return (
    await supabase
      .from('columns')
      .select('*')
      .eq('board_id', boardId)
      .order('id', { ascending: true })
  ).data as Column[];
};

export const createColumn = async (params: CreateColumnParams): Promise<Column> => {
  return (
    await supabase
      .from('columns')
      .insert({ name: params.name, board_id: params.board_id })
      .select('*')
  ).data![0];
};

export const deleteColumn = async (params: DeleteColumnParams): Promise<Column> => {
  return (await supabase.from('columns').delete().eq('id', params.id).select('*')).data![0];
};
